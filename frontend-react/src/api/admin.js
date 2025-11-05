import api from "./axios";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Get all users
export const getAllUsers = async () => {
  const res = await api.get("/admin/users", getAuthHeaders());
  return res.data;
};

// Change user role
export const changeUserRole = async (userId, newRoleId) => {
  const res = await api.patch(
    `/admin/users/${userId}/role`,
    { role_id: newRoleId }, // Changed from role_name to 
    getAuthHeaders()
  );
  return res.data;
};

// Delete user
export const deleteUser = async (userId) => {
  const res = await api.delete(`/admin/users/${userId}`, getAuthHeaders());
  return res.data;
};
