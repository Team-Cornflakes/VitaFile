import pytesseract

def ocr_from_image(img):
    text = pytesseract.image_to_string(img)
    return text