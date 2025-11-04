import { Box, Text } from "@chakra-ui/react";

export default function RoleDetail({ role }) {
  if (!role) return null;

  return (
    <Box mt={4}>
      <Text fontWeight="bold">Selected Role:</Text>
      <Text>ID: {role.id}</Text>
      <Text>Name: {role.name}</Text>
      <Text>Description: {role.description}</Text>
    </Box>
  );
}