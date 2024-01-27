from dotenv import dotenv_values
import textwrap
from PIL import Image
import io
import google.generativeai as genai
from IPython.display import Markdown    

def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))


GOOGLE_API_KEY=dotenv_values('.env')['GOOGLE_API_KEY']
genai.configure(api_key=GOOGLE_API_KEY)

def ocr_from_image(img):
    img = Image.open(io.BytesIO(img))
    model = genai.GenerativeModel('gemini-pro-vision')

    response = model.generate_content(["extract the text in proper way from this image", img], stream=True)
    response.resolve()
    return response.text