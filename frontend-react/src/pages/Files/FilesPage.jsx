import { Box, Text } from "@chakra-ui/react";
import FileListWrapper from "./FileListWrapper";

export default function FilesPage() {
  return (
    <Box>
      <Text fontWeight="bold" mb={2}>File Upload</Text>
      <FileListWrapper />
    </Box>
  );
}
