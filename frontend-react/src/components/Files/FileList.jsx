import { Box, Button, List, ListItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { listFiles, deleteFile, downloadFile } from "../../api/files";

export default function FileList() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const data = await listFiles();
      setFiles(data);
    } catch (err) {
      console.error(err);
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

  const handleDelete = async (filename) => {
    try {
      await deleteFile(filename);
      fetchFiles();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <Box>
      <List>
        {files.map((file) => (
          <ListItem key={file}>
            <Text>{file}</Text>
            <Button onClick={() => handleDownload(file)}>Download</Button>
            <Button onClick={() => handleDelete(file)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
