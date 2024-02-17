from googletrans import Translator, LANGUAGES

def translate(text, dest_language):
    translator = Translator()
    translation = translator.translate(text, dest=dest_language)
    return translation.text
