// src/pages/notifications/SendNotification.jsx
import { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { sendNotification } from "../../api/notifications";

export default function SendNotification() {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await sendNotification(formData);
      toast({
        title: "Notification Sent!",
        description: res.message || "Successfully broadcasted to all clients.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setFormData({ title: "", message: "" });
    } catch (err) {
      toast({
        title: "Error Sending Notification",
        description: err.response?.data?.detail || err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="2xl" boxShadow="md">
      <Heading size="lg" mb={4}>Send Notification</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            name="title"
            placeholder="Notification Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            placeholder="Notification Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={loading}
            w="full"
          >
            Send Notification
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
