import requests
import json

def summary_text(data):
    url = "https://api.gemini.com/v1/summarize"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_GEMINI_API_KEY"
    }
    body = {
        "text": data,
        "max_length": 50
    }
    response = requests.post(url, headers=headers, data=json.dumps(body))
    summary_result = response.json()

    if 'summary' in summary_result:
        return summary_result['summary']
    else:
        return "Error: Could not generate summary"