import { Box, Text } from "@chakra-ui/react";
import RoleForm from "../../components/Roles/RoleForm";
import RoleActions from "../../components/Roles/RoleActions";

export default function Roles() {
  return (
    <Box>
      <Text fontWeight="bold">Roles</Text>
      <RoleForm />
      <RoleActions />
    </Box>
  );
}
