from flask import Flask, request
from flask_cors import CORS

import io
import cv2
import base64 
import pytesseract
import numpy as np
from PIL import Image


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

    return text


api = Flask(__name__)
CORS(api)

@api.route('/', methods=['POST', 'GET'])
def handle_fetch_request():
    if request.method == 'POST':
        json = request.get_json()

        pil_image = base64_to_image(json['base64'])
        print(detect_text_from_image(pil_image))

        return json

    else:
        print("GETR")
        return 'GETTER'


if __name__ == '__main__':
    api.run(host='127.0.0.1', port=5000, debug=False)