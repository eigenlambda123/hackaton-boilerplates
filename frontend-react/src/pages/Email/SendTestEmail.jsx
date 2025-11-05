import React, { useState } from "react";
import { useToast, Box, Input, Button, Heading } from "@chakra-ui/react";
import { sendTestEmail } from "../../api/email";

export default function SendTestEmail() {
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendTestEmail({ to: recipient });
      toast({
        title: "Email sent.",
        description: `Test email sent to ${recipient}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setRecipient("");
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send email.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="md">
      <Heading mb={4}>Send Test Email</Heading>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Recipient Email"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          mb={3}
        />
        <Button type="submit" isLoading={loading} colorScheme="blue">
          Send Test Email
        </Button>
      </form>
    </Box>
  );
}