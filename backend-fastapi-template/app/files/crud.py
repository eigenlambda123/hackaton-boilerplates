import shutil
from fastapi import UploadFile, HTTPException
from .utils import get_file_path, validate_filename, BASE_DIR
import os

def save_file(file: UploadFile) -> str:
    filename = validate_filename(file.filename)
    file_path = get_file_path(filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return filename

def delete_file(filename: str):
    file_path = get_file_path(filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    os.remove(file_path)

def list_files():
    return os.listdir(BASE_DIR)
