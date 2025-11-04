import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { listFiles, deleteFile, downloadFile } from "../../api/files";
import FileUpload from "../../components/Files/FileUpload";

export default function FileListWrapper() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const data = await listFiles();
      setFiles(data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);


  const handleDelete = async (filename) => {
    try {
      await deleteFile(filename);
      await fetchFiles();
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  
  const handleDownload = async (filename) => {
    try {
      const blob = await downloadFile(filename);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <FileUpload onUploaded={fetchFiles} /> {/* Triggers refresh */}
      <Text fontWeight="bold" mt={4}>Files</Text>
      {files.map((file) => (
        <Box key={file}>
          <Text>{file}</Text>
          <button onClick={() => handleDownload(file)}>Download</button>
          <button onClick={() => handleDelete(file)}>Delete</button>
        </Box>
      ))}
    </Box>
  );
}