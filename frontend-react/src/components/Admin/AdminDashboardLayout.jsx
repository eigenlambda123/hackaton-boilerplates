import { Box, VStack, Heading } from "@chakra-ui/react";

export default function AdminDashboardLayout({ title, children }) {
  return (
    <Box maxW="1000px" mx="auto" mt={10} p={4}>
      <VStack spacing={6} align="stretch">
        <Heading size="md" textAlign="center">
          {title}
        </Heading>
        {children}
      </VStack>
    </Box>
  );
}
