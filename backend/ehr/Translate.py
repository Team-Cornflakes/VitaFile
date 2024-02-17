from googletrans import Translator, LANGUAGES

def translate_text(text, dest_language):
    translator = Translator(service_urls=['translate.google.com'])
    translation = translator.translate(text, dest=dest_language)
    return translation.text