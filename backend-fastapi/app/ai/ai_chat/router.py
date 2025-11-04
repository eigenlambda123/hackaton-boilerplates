from fastapi import APIRouter, HTTPException, status
from .schemas import ChatRequest
from .utils import generate_chat_response

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Generate an AI chat response using Cohere.
    You can send a custom system prompt or select a predefined preset.
    """
    try:
        reply = generate_chat_response(
            messages=request.messages,
            model=request.model,
            temperature=request.temperature,
            system_prompt=request.system_prompt,
            preset=request.preset_prompt,
        )
        return {"response": reply}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
