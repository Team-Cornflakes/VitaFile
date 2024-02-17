import speech_recognition as sr

def recognize_speech_from_mic():
    # Initialize the recognizer and microphone
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()

    with microphone as source:
        # Adjust the recognizer sensitivity to ambient noise
        recognizer.adjust_for_ambient_noise(source)
        

        try:
            # Listen for the first phrase and extract it into audio data
            audio = recognizer.listen(source, timeout=5)

            # Recognize speech using Google Web Speech API
            text = recognizer.recognize_google(audio)
            print(text)

        except sr.WaitTimeoutError:
            print("Listening timed out while waiting for phrase to start")
        except sr.UnknownValueError:
            print("Could not understand audio")
        except sr.RequestError as e:
            print(f"Could not request results from Google Web Speech API; {e}")

if __name__ == "__main__":
    recognize_speech_from_mic()
