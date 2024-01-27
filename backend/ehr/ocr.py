import pytesseract
from PIL import Image
import io

def ocr_from_image(img):
    img = Image.open(io.BytesIO(img))
    text = pytesseract.image_to_string(img)
    return text