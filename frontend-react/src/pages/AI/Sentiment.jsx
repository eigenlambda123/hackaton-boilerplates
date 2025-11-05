import { useState } from "react";
import { Box, Heading, Textarea, Button, Text, VStack, useToast } from "@chakra-ui/react";
import { analyzeSentiment } from "../../api/ai";

export default function Sentiment() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const res = await analyzeSentiment({ text: input });
      setResult(res);
    } catch (err) {
      toast({
        title: "Error analyzing sentiment",
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
      <Heading size="lg" mb={4}>Sentiment Analysis</Heading>
      <VStack spacing={4}>
        <Textarea
          placeholder="Enter text to analyze..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleAnalyze} isLoading={loading}>
          Analyze
        </Button>
        {result && (
          <Box>
            <Text fontWeight="bold">Result:</Text>
            <Text>{JSON.stringify(result)}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
