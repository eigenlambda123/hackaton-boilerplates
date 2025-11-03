import time
from pathlib import Path

def simulate_long_task(duration: int = 5):
    """
    Simulates a time-consuming task.
    """
    print(f"[TASK] Starting long task ({duration}s)...")
    time.sleep(duration)
    print("[TASK] Task completed!")

def save_uploaded_file(file_path: Path, content: bytes):
    """
    Simulates saving a file asynchronously.
    """
    print(f"[TASK] Saving file to: {file_path}")
    file_path.write_bytes(content)
    print("[TASK] File saved successfully.")