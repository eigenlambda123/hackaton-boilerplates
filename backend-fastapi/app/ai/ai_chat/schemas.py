from pydantic import BaseModel
from typing import Optional, List

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    model: Optional[str] = "command-a-03-2025"  # Default to Cohere model
    temperature: float = 0.5
    system_prompt: Optional[str] = None  # Optional system prompt
    preset_prompt: Optional[str] = None  # Optional preset prompt

class ChatResponse(BaseModel):
    response: str
