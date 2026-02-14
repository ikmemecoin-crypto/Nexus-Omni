from fastapi import FastAPI, Request
from groq import Groq
import os

app = FastAPI()

# Initialize Groq
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

@app.get("/api/health")
def health():
    return {"status": "Nexus Omni Online"}

@app.post("/api/chat")
async def chat(request: Request):
    try:
        data = await request.json()
        user_msg = data.get("message")
        
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": user_msg}]
        )
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}
