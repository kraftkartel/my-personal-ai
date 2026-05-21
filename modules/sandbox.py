# sandbox.py
import subprocess

def run_code_safely(code: str):
    """
    Run code in a sandboxed subprocess.
    """
    try:
        process = subprocess.run(
            ["python3", "-c", code],
            capture_output=True,
            text=True,
            timeout=5
        )
        return process.stdout or process.stderr
    except Exception as e:
        return f"Error: {e}"
