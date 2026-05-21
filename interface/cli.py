import sys
sys.path.insert(0, '/content/project')

from modules.chat_model import generate_response
from modules.chat_rules import apply_rules
from modules.image_reader import read_image
from modules.image_editor import resize_image, convert_to_gray
from modules.code_model import generate_code
from modules.sandbox import run_code_safely
def main():
    print("🤖 Personal AI CLI")
    while True:
        mode = input("\nChoose mode (chat/exit): ").strip().lower()
        if mode == "exit":
            break
        elif mode == "chat":
            user_input = input("You: ")
            raw = generate_response(user_input)
            safe = apply_rules(raw)
            print(f"AI: {safe}")

main()