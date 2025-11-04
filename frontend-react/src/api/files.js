import api from './axios';

// Upload single file
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Upload multiple files
export const uploadMultipleFiles = async (files) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }

  const res = await api.post("/files/upload-multiple", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Download file
export const downloadFile = async (filename) => {
  const res = await api.get(`/files/download/${filename}`, {
    responseType: "blob",
  });
  return res.data;
};

// Delete file
export const deleteFile = async (filename) => {
  const res = await api.delete(`/files/${filename}`);
  return res.data;
};

// List files
export const listFiles = async () => {
  const res = await api.get("/files/list");
  return res.data;
};
