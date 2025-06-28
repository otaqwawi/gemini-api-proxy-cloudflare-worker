from google import genai
from google.genai.types import HttpOptions

client = genai.Client(api_key="YOUR_GEMINI_API_KEY", http_options=HttpOptions(base_url="https://your-worker-name.otaqwawi.workers.dev"))
response = client.models.generate_content_stream(
    model="gemini-2.0-flash",
    contents="Halooo",
)

for chunk in response:
    print(chunk.text)
