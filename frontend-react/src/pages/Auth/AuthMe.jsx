import React, { useEffect, useState } from 'react';
import { getMe } from '../../api/auth';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AuthMe = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (err) {
        console.error('Not authenticated');
      }
    };
    fetchMe();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/auth/login');
  };

  if (!user) return <Text>Not logged in</Text>;

  return (
    <Box>
      <Heading>My Profile</Heading>
      <Text>ID: {user.id}</Text>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default AuthMe;
