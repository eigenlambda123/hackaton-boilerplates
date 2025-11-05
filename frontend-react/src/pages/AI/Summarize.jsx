import { useState } from "react";
import { Box, Heading, Textarea, Button, Text, VStack, useToast } from "@chakra-ui/react";
import { summarizeText } from "../../api/ai";

export default function Summarize() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSummarize = async () => {
    try {
      setLoading(true);
      const res = await summarizeText({ text: input });
      setSummary(res.summary || res.result || "No summary returned");
    } catch (err) {
      toast({
        title: "Error summarizing text",
        description: err.response?.data?.detail || err.message,
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="xl" mx="auto" mt={10}>
      <Heading size="lg" mb={4}>AI Summarizer</Heading>
      <VStack spacing={4}>
        <Textarea
          placeholder="Enter text to summarize..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleSummarize} isLoading={loading}>
          Summarize
        </Button>
        {summary && (
          <Box>
            <Text fontWeight="bold">Summary:</Text>
            <Text>{summary}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
