# chat_rules.py
import json

# Load boundaries from config
with open("config/boundaries.json", "r") as f:
    boundaries = json.load(f)

def apply_rules(response: str) -> str:
    """
    Check chatbot response against forbidden topics.
    """
    forbidden = boundaries.get("forbidden", [])
    for word in forbidden:
        if word.lower() in response.lower():
            return "⚠️ Sorry, I cannot provide that content."
    return response
