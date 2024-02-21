import os
import requests
import base64
import json
import pyaudio
from dotenv import dotenv_values

SPEECH_API = dotenv_values('.env')['SPEECH_API_KEY']

if SPEECH_API is None:
    raise EnvironmentError("SPEECH_API environment variable not set.")

RATE = 16000
CHUNK = 1024  

def process_audio(audio_data):
    
    p = pyaudio.PyAudio()
    stream = p.open(format=pyaudio.paInt16,
                    channels=1,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)

    frames = []

    
    for data in audio_data:
        frames.append(data)

    stream.stop_stream()
    stream.close()
    p.terminate()

    return b''.join(frames)
def transcribe_audio(audio_content):
    
    url = f"https://speech.googleapis.com/v1/speech:recognize?key={SPEECH_API}"
    headers = {"Content-Type": "application/json"}

    audio_content_base64 = base64.b64encode(audio_content).decode("utf-8")

    body = {
        "config": {
            "encoding": "LINEAR16",
            "sampleRateHertz": RATE,
            "languageCode": "en-US",
        },
        "audio": {
            "content": audio_content_base64
        }
    }

    response = requests.post(url, headers=headers, data=json.dumps(body))
    result = response.json()


    
    transcript = ""
    if "results" in result:
        for res in result["results"]:
            for alt in res.get("alternatives", []):
                
                if 'transcript' in alt:
                    transcript += alt["transcript"] + " "
                else:
                    
                    transcript += "Transcription not available. "
    else:
        transcript = "No transcription results."

    return transcript.strip()

def main():
    RECORD_SECONDS = 15 
    audio_content = record_audio(RECORD_SECONDS)
    transcript = transcribe_audio(audio_content)
    print(transcript)

