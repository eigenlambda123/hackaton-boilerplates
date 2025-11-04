import React, { useState } from 'react';
import { register } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Input, Button, VStack } from '@chakra-ui/react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    await register({ name, email, password });
    navigate('/auth/login'); // redirect to login after registration
  };

  return (
    <Box>
      <Heading>Register</Heading>
      <VStack>
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleRegister}>Register</Button>
      </VStack>
    </Box>
  );
};

export default Register;
