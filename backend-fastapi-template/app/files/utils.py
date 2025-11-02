import os
from fastapi import HTTPException

BASE_DIR = "uploaded_files"  # directory to store uploaded files
os.makedirs(BASE_DIR, exist_ok=True)  # ensure folder exists

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "pdf", "txt"}

def validate_filename(filename: str):
    ext = filename.split(".")[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"File type .{ext} not allowed")
    return filename

def get_file_path(filename: str):
    return os.path.join(BASE_DIR, filename)
