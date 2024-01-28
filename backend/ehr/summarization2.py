import textwrap

import google.generativeai as genai
from dotenv import dotenv_values
from IPython.display import display
from IPython.display import Markdown

GOOGLE_API_KEY=dotenv_values('.env')['GOOGLE_API_KEY']
genai.configure(api_key=GOOGLE_API_KEY)

def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

def generatecontent(data):
  genai.configure(api_key=GOOGLE_API_KEY)
  model = genai.GenerativeModel('gemini-pro')
  response = model.generate_content(data)
  return response.text