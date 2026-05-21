from preprocess import prepare_data, prepare_tokenizer
from model import build_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.metrics import classification_report
import numpy as np


# -----------------------------
# LOAD DATA
# -----------------------------
X_train, X_test, y_train, y_test = prepare_data()

# -----------------------------
# TOKENIZE
# -----------------------------
tokenizer, X_train_pad = prepare_tokenizer(X_train)
X_test_pad = tokenizer.texts_to_sequences(X_test)
X_test_pad = pad_sequences(X_test_pad, maxlen=100, padding="post")

y_train = np.array(y_train)
y_test = np.array(y_test)

# -----------------------------
# BUILD MODEL
# -----------------------------
model = build_model()

# -----------------------------
# TRAIN
# -----------------------------
early_stop = EarlyStopping(patience=2, restore_best_weights=True)

history = model.fit(
    X_train_pad,
    y_train,
    validation_data=(X_test_pad, y_test),
    epochs=10,
    batch_size=32,
    callbacks=[early_stop]
)

# -----------------------------
# EVALUATE
# -----------------------------
loss, acc = model.evaluate(X_test_pad, y_test)

# -----------------------------
# FINAL METRICS
# -----------------------------

print("\n📊 Final Metrics:")

print("Train Accuracy:", history.history["accuracy"][-1])
print("Validation Accuracy:", history.history["val_accuracy"][-1])
print("Test Accuracy:", acc)

# predictions
y_pred = model.predict(X_test_pad)
y_pred = y_pred.argmax(axis=1)

print("\n📊 Classification Report:")
print(classification_report(y_test, y_pred))
# -----------------------------
# SAVE MODEL
# -----------------------------
model.save("ml/text/keras_cnn/saved/cnn_model.keras")

print("✅ Model saved!")