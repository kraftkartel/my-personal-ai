# chat_model.py
from transformers import pipeline

# Load a small pre-trained chatbot model
chatbot = pipeline("text-generation", model="gpt2")

def generate_response(user_input: str) -> str:
    """
    Generate a response from the chatbot model.
    """
    result = chatbot(user_input, max_length=100, num_return_sequences=1)
    return result[0]["generated_text"]
