import { getAllUsers, changeUserRole, deleteUser } from "../../api/admin";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Button,
  Box,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";

// Temporary hardcoded roles — ideally, fetch from backend
const AVAILABLE_ROLES = [
  { id: 1, name: "Admin" },
  { id: 2, name: "User" },
];


export default function AdminUserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
      console.log("Fetched users:", data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to fetch users",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRoleId) => {
    try {
      await changeUserRole(userId, Number(newRoleId));

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                role_name:
                  AVAILABLE_ROLES.find((r) => r.id === Number(newRoleId))
                    ?.name ?? user.role_name,
              }
            : user
        )
      );

      toast({
        title: "Role updated",
        status: "success",
        duration: 2000,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to update role",
        status: "error",
        duration: 3000,
      });
    }
  };


  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
      toast({
        title: "User deleted",
        status: "info",
        duration: 2000,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to delete user",
        status: "error",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <Box textAlign="center" mt={6}>
        <Spinner />
      </Box>
    );

  if (users.length === 0)
    return (
      <Box textAlign="center" mt={6}>
        <Text>No users found.</Text>
      </Box>
    );

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td>{user.id}</Td>
            <Td>{user.email}</Td>
            <Td>
              <Select
                value={
                  AVAILABLE_ROLES.find((r) => r.name === user.role_name)?.id ?? ""
                }
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
              >
                {AVAILABLE_ROLES.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Select>

            </Td>
            <Td>
              <Button colorScheme="red" onClick={() => handleDelete(user.id)}>
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
