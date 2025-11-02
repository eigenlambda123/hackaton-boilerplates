from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import FileResponse as FastAPIFileResponse
from .crud import save_file, delete_file, list_files
from .utils import get_file_path
from .schemas import FileResponse
from typing import List
import os

router = APIRouter(prefix="/files", tags=["files"])

@router.post("/upload", response_model=FileResponse)
def upload_file(file: UploadFile = File(...)):
    filename = save_file(file)
    return {"filename": filename, "url": f"/files/download/{filename}"}

@router.get("/download/{filename}")
def download_file(filename: str):
    file_path = get_file_path(filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    return FastAPIFileResponse(file_path, filename=filename)

@router.delete("/{filename}")
def remove_file(filename: str):
    delete_file(filename)
    return {"detail": f"{filename} deleted successfully"}

@router.get("/list", response_model=List[str])
def get_files():
    return list_files()
