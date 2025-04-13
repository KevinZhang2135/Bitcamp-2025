# Flask
from flask import Flask, request
from flask_cors import CORS

# Systems
import io
import os
from dotenv import load_dotenv
import base64 


# Image parsing
import cv2
import pytesseract
from PIL import Image
import numpy as np

# Databases
import pymongo
import json

api = Flask(__name__)
CORS(api)

load_dotenv()
MONGODB_KEY = os.getenv("EXPO_PUBLIC_MONGODB_API_KEY")

client = pymongo.MongoClient(MONGODB_KEY)
database = client['medicial_database']
medicines_table = database['medicines']

print(MONGODB_KEY)
print(medicines_table)
for i in medicines_table.find():
    print(i)
    
exit(0)

def base64_to_image(base64_string: str) -> Image:
    """Concerts a base 64 string into a PIL image

    Args:
        base64_string (str): The base 64 string to convert

    Returns:
        Image: The image represented by the string
    """
    imgdata = base64.b64decode(base64_string)
    return Image.open(io.BytesIO(imgdata))

def detect_text_from_image(pil_image: Image) -> str:
    """Parses text from image

    Args:
        pil_image (Image): The image to parse text from

    Returns:
        str: The text in the image
    """
    pil_image = pil_image.convert('L')
    opencv_image = np.array(pil_image)

    blurred = cv2.blur(opencv_image, (3,3))
    pil_image = Image.fromarray(blurred)
    text = pytesseract.image_to_string(pil_image, lang='eng')

    print(f'\tDebug: {text}')
    return text


@api.route('/', methods=['POST', 'GET'])
def handle_fetch_request():
    if request.method == 'POST':
        data = request.get_json()

        pil_image = base64_to_image(data['base64'])
        text = detect_text_from_image(pil_image)

        if text:
            print(f'Debug: {medications}')

        return data

    else:
        return json.dumps(medications, indent=4)


if __name__ == '__main__':
    api.run(host='127.0.0.1', port=5000, debug=False)