import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { uploadFile, uploadMultipleFiles } from "../../api/files";

export default function FileUpload({ onUploaded }) {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);

  const handleSingleUpload = async () => {
    try {
      if (!singleFile) return;
      await uploadFile(singleFile);
      setSingleFile(null);
      if (onUploaded) {onUploaded();}
    } catch (err) {
      console.error(err);
    }
  };

  const handleMultipleUpload = async () => {
    try {
      if (multipleFiles.length === 0) return;
      await uploadMultipleFiles(multipleFiles);
      setMultipleFiles([]);
      if (onUploaded) onUploaded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Input type="file" onChange={(e) => setSingleFile(e.target.files[0])} />
      <Button onClick={handleSingleUpload}>Upload File</Button>

      <Input
        type="file"
        multiple
        onChange={(e) => setMultipleFiles(Array.from(e.target.files))}
      />
      <Button onClick={handleMultipleUpload}>Upload Multiple Files</Button>
    </Box>
  );
}
