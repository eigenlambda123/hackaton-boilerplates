import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { createRole } from "../../api/roles";

export default function RoleForm({ onCreated }) {
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");

  const handleCreate = async () => {
    try {
      await createRole({
        name: roleName,
        description: roleDescription,
      });
      setRoleName("");
      setRoleDescription("");
      if (onCreated) onCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Input
        placeholder="Role Name"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
      />
      <Input
        placeholder="Description"
        value={roleDescription}
        onChange={(e) => setRoleDescription(e.target.value)}
      />
      <Button onClick={handleCreate}>Create Role</Button>
    </Box>
  );
}
