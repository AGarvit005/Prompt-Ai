# File: apps/ai-service/main.py

import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure the Google Gemini client
try:
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
except Exception as e:
    print(f"Error initializing Google Gemini client: {e}")
    model = None

app = FastAPI()

# --- Pydantic Models (no changes needed) ---
class PromptRequest(BaseModel):
    prompt: str

class ArchitectureResponse(BaseModel):
    diagram_type: str
    code: str

class ProcessedResponse(BaseModel):
    original_prompt: str
    enhanced_prompt: str
    quality_score: float
    architecture: ArchitectureResponse
    roadmap: list[str]

# --- REAL AI-Powered Engines (Now with Gemini) ---

def call_gemini_api(system_prompt: str, user_prompt: str) -> str:
    """A reusable function to call the Gemini API."""
    if not model:
        raise HTTPException(status_code=500, detail="Google Gemini client not initialized.")
    
    full_prompt = f"{system_prompt}\n\nUser Idea: '{user_prompt}'"
    
    try:
        response = model.generate_content(full_prompt)
        return response.text.strip()
    except Exception as e:
        print(f"ERROR: Google Gemini API call failed: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to communicate with Google AI: {e}")

def optimize_prompt_engine(text: str) -> str:
    print(f"INFO: Calling Gemini to enhance prompt for: {text}")
    system_prompt = "You are an expert prompt engineer. Take the user's idea and rephrase it into a clear, detailed, and professional prompt suitable for an AI system architect. Focus on core features, user roles, and technology preferences if mentioned."
    return call_gemini_api(system_prompt, text)

def generate_architecture_engine(text: str) -> str:
    """Uses a real AI to generate a Mermaid.js diagram with a more robust prompt."""
    print(f"INFO: Calling Gemini to generate architecture for: {text}")

    # This new prompt is more specific and gives the AI a clear example of what to do.
    system_prompt = (
        "You are an expert software architect who ONLY responds with Mermaid.js code. "
        "Your task is to create a logical system architecture diagram based on the user's idea. "
        "Follow these rules STRICTLY:\n"
        "1. The diagram MUST start with 'graph TD;'.\n"
        "2. Use simple node shapes: `id[Text]` for rectangles, `id(Text)` for rounded rectangles, and `id{Text}` for diamonds.\n"
        "3. Use '-->' for arrows.\n"
        "4. DO NOT use any markdown like ```mermaid or ```. Do not add ANY explanatory text or titles.\n"
        "5. The output must be ONLY the raw Mermaid code and nothing else.\n\n"
        "Here is a perfect example of output:\n"
        "graph TD;\n    A[User] --> B(Web App);\n    B --> C{API Gateway};\n    C --> D[User Service];\n    C --> E[Data Service];\n    D --> F[(Database)];\n    E --> F;"
    )

    # The call itself remains the same
    return call_gemini_api(system_prompt, text)


# --- API Endpoint (no changes needed) ---
@app.post("/process", response_model=ProcessedResponse)
async def process_prompt(request: PromptRequest):
    original_prompt = request.prompt
    enhanced_prompt = optimize_prompt_engine(original_prompt)
    architecture_code = generate_architecture_engine(enhanced_prompt)
    roadmap = ["Phase 1: MVP", "Phase 2: Add features", "Phase 3: Scale"]
    
    return ProcessedResponse(
        original_prompt=original_prompt,
        enhanced_prompt=enhanced_prompt,
        quality_score=0.9,
        architecture=ArchitectureResponse(diagram_type="mermaid", code=architecture_code),
        roadmap=roadmap,
    )