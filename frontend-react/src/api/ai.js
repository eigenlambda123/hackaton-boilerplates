import api from "./axios";

// Summarize text
export const summarizeText = async (data) => {
  const res = await api.post("/ai/summarize", data);
  return res.data;
};

// Sentiment analysis
export const analyzeSentiment = async (data) => {
  const res = await api.post("/ai/sentiment", data);
  return res.data;
};