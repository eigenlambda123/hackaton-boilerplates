import { Box, Button, List, ListItem, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getRoles, getRole, deleteRole } from "../../api/roles";
import RoleDetail from "./RoleDetail";

export default function RoleActions() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRole = async (id) => {
    try {
      const data = await getRole(id);
      setSelectedRole(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRole(id);
      fetchRoles();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <Box>
      <List>
        {roles.map((role) => (
          <ListItem key={role.id}>
            <Text>
              {role.name} - {role.description}
            </Text>
            <Button onClick={() => fetchRole(role.id)}>View</Button>
            <Button onClick={() => handleDelete(role.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      <RoleDetail role={selectedRole} />
    </Box>
  );
}