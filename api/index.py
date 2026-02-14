from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from groq import Groq
import os

app = FastAPI()

@app.post("/api/chat")
async def chat(request: Request):
    try:
        # 1. Get the message from the website
        data = await request.json()
        user_message = data.get("message")
        
        # 2. Check if API Key exists
        api_key = os.environ.get("GROQ_API_KEY")
        if not api_key:
            return JSONResponse({"response": "Error: GROQ_API_KEY is missing in Vercel settings!"})

        # 3. Talk to Groq
        client = Groq(api_key=api_key)
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": user_message}]
        )
        
        return {"response": completion.choices[0].message.content}
    except Exception as e:
        return JSONResponse({"response": f"Python Error: {str(e)}"})
