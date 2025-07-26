# import requests

# # URL of your backend API route (adjust if needed)
# API_URL = "http://localhost:5001/api/llm"

# # Sample reviews
# fake_review = "This product is amazing! I would give it 10 stars if I could. Absolutely life-changing."
# real_review = "The product works as expected. Delivery was on time and the packaging was decent."

# # Loop through both
# for review in [("Fake", fake_review), ("Real", real_review)]:
#     label, text = review
#     payload = {
#         "prompt": f"Detect if the following review is fake or real:\n\n{text}\n\nRespond with only 'Fake' or 'Real'."
#     }

#     print(f"\n🔍 Sending {label} review to API...\n")
#     response = requests.post(API_URL, json=payload)

#     if response.ok:
#         print(f"✅ Response: {response.text.strip()}")
#     else:
#         print(f"❌ Error: {response.status_code} - {response.text}")
import requests

response = requests.post("http://localhost:5000/api/llm", json={
    "prompt": "Is this review fake? The product was perfect and life-changing!"
})
print(response.json())

