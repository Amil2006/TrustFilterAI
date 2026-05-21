import pandas as pd
import re
from sklearn.model_selection import train_test_split

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# -----------------------------
# TEXT CLEANING
# -----------------------------

def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)  # remove links
    text = re.sub(r"[^a-zA-Z0-9\s]", "", text)  # remove special chars
    text = re.sub(r"\s+", " ", text).strip()
    return text


# -----------------------------
# LOAD + MERGE DATA
# -----------------------------

def safe_sample(df, n):
    return df.sample(n=min(len(df), n), random_state=42)

def load_and_merge():
    synthetic = pd.read_csv("ml/data/raw/reviews.csv")
    real = pd.read_csv("ml/data/raw/real_reviews.csv")
    big = pd.read_csv("ml/data/raw/filtered_40k.csv")
    hard = pd.read_csv("ml/data/raw/hard_reviews.csv")  # includes hard + hard spam

    # safe sampling
    def safe_sample(df, n):
        return df.sample(n=min(len(df), n), random_state=42)

    synthetic = safe_sample(synthetic, 2000)
    real = safe_sample(real, 800)
    big = safe_sample(big, 3000)
    hard = safe_sample(hard, 1200)  # slightly higher weight now

    df = pd.concat([synthetic, real, big, hard], ignore_index=True)

    df["review"] = df["review"].astype(str)
    df["review"] = df["review"].apply(clean_text)

    return df


# -----------------------------
# LABEL ENCODING
# -----------------------------

def encode_labels(labels):
    mapping = {
        "genuine": 0,
        "fake": 1,
        "spam": 2
    }
    return labels.map(mapping)


# -----------------------------
# TRAIN TEST SPLIT
# -----------------------------

def prepare_data():
    df = load_and_merge()

    df["label"] = encode_labels(df["label"])

    X_train, X_test, y_train, y_test = train_test_split(
        df["review"],
        df["label"],
        test_size=0.2,
        random_state=42,
        stratify=df["label"]
    )

    return X_train, X_test, y_train, y_test


def prepare_tokenizer(texts, vocab_size=8000, max_len=100):
    tokenizer = Tokenizer(num_words=vocab_size, oov_token="<OOV>")
    tokenizer.fit_on_texts(texts)

    sequences = tokenizer.texts_to_sequences(texts)
    padded = pad_sequences(sequences, maxlen=max_len, padding="post")

    return tokenizer, padded