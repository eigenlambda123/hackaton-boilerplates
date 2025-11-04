import api from './axios';

// Get all roles
export const getRoles = async () => {
  const res = await api.get('/roles/');
  return res.data;
};

// Get a single role
export const getRole = async (id) => {
  const res = await api.get(`/roles/${id}`);
  return res.data;
};

// Create a new role
export const createRole = async (data) => {
  const res = await api.post('/roles/', data);
  return res.data;
};

// Delete a role
export const deleteRole = async (id) => {
  const res = await api.delete(`/roles/${id}`);
  return res.data;
};