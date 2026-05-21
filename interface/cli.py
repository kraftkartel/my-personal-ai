# cli.py
from modules.chat.chat_model import generate_response
from modules.chat.chat_rules import apply_rules
from modules.vision.vision_image_reader import read_image
from modules.vision.image_editor import resize_image, convert_to_gray
from modules.programming.code_model import generate_code
from modules.programming.sandbox import run_code_safely

def main():
    print("🤖 Personal AI CLI (type 'exit' to quit)")
    print("Modes: chat | vision | code")

    while True:
        mode = input("\nChoose mode: ").strip().lower()
        if mode == "exit":
            print("Goodbye!")
            break

        if mode == "chat":
            user_input = input("You: ")
            raw = generate_response(user_input)
            safe = apply_rules(raw)
            print(f"AI: {safe}")

        elif mode == "vision":
            path = input("Enter image path: ")
            try:
                img = read_image(path)
                gray = convert_to_gray(img)
                resized = resize_image(img, 200, 200)
                print("✅ Image processed (grayscale + resized).")
            except Exception as e:
                print(f"Error: {e}")

        elif mode == "code":
            prompt = input("Enter code prompt: ")
            code = generate_code(prompt)
            print("\nGenerated Code:\n", code)
            print("\nSandbox Output:\n", run_code_safely(code))

        else:
            print("⚠️ Invalid mode. Choose chat, vision, or code.")

if __name__ == "__main__":
    main()
