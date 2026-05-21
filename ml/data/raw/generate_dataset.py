import random
import pandas as pd

# -----------------------------
# BASE COMPONENTS
# -----------------------------

products = [
    "phone", "laptop", "headphones", "watch", "camera"
]

positive_phrases = [
    "works well", "good quality", "worth the price",
    "satisfied with the purchase", "does the job"
]

negative_phrases = [
    "not great", "poor quality", "not worth it",
    "disappointed", "stopped working"
]

fake_hype_phrases = [
    "BEST PRODUCT EVER", "LIFE CHANGING", "MUST BUY",
    "UNBELIEVABLE", "TOP QUALITY GUARANTEED"
]

spam_phrases = [
    "click here now", "visit this link", "limited offer",
    "earn money fast", "buy now before it's gone"
]

# -----------------------------
# TEXT GENERATORS
# -----------------------------

def generate_genuine():
    product = random.choice(products)
    phrase = random.choice(positive_phrases + negative_phrases)

    templates = [
        f"The {product} {phrase}.",
        f"I bought this {product} recently and it {phrase}.",
        f"After using this {product}, I feel it {phrase}.",
        f"This {product} is okay, it {phrase}.",
    ]

    return random.choice(templates)


def generate_fake():
    product = random.choice(products)
    hype = random.choice(fake_hype_phrases)

    templates = [
        f"This {product} is {hype}!!!",
        f"{hype}!!! Everyone should buy this {product}!!!",
        f"I can't believe how amazing this {product} is!!! {hype}!!!",
        f"{product.upper()} IS {hype}!!! DON'T MISS OUT!!!",
    ]

    return random.choice(templates)


def generate_spam():
    phrase = random.choice(spam_phrases)

    templates = [
        f"{phrase} to get this product now!!!",
        f"{phrase} and win exciting prizes!!!",
        f"{phrase} for huge discounts!!!",
        f"{phrase.upper()}!!! LIMITED TIME OFFER!!!",
    ]

    return random.choice(templates)


# -----------------------------
# NOISE / VARIATION
# -----------------------------

def add_noise(text):
    # Random repetition
    if random.random() < 0.3:
        text = text + " " + text

    # Random punctuation
    if random.random() < 0.3:
        text += "!!!"

    # Random uppercase
    if random.random() < 0.2:
        text = text.upper()

    return text


# -----------------------------
# DATASET GENERATION
# -----------------------------

def generate_dataset(n_genuine=2000, n_fake=2000, n_spam=1000):
    data = []

    for _ in range(n_genuine):
        text = add_noise(generate_genuine())
        data.append({"review": text, "label": "genuine"})

    for _ in range(n_fake):
        text = add_noise(generate_fake())
        data.append({"review": text, "label": "fake"})

    for _ in range(n_spam):
        text = add_noise(generate_spam())
        data.append({"review": text, "label": "spam"})

    df = pd.DataFrame(data)
    df = df.sample(frac=1).reset_index(drop=True)

    return df


# -----------------------------
# SAVE
# -----------------------------

if __name__ == "__main__":
    df = generate_dataset()
    df.to_csv("ml/data/raw/reviews.csv", index=False)
    print("Dataset created:", df.shape)