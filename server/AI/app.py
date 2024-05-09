from flask import Flask, jsonify, request
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define the folder path where images are stored
folder_path = "examples"

# Load your model
fakeImagesModel = load_model('./models/Images/AI-Images/AI-Image-Detection.h5')
imageClassificationModel = load_model('./models/Images/Image-Categorize/image_classification.h5')

@app.route('/')
def hello():
    return 'AI BE is working!'

@app.route('/evaluateImage', methods=['POST'])
def evaluate_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image found in the request'}), 400

    # Get the image file from the request
    image_file = request.files['image']

    userInput = Image.open(image_file)

    left = (userInput.width - 500) // 2
    top = (userInput.height - 500) // 2
    right = left + 500
    bottom = top + 500

    userInput_cropped = userInput.crop((left, top, right, bottom))
    userInput_array = img_to_array(userInput_cropped)
    userInput_processed = userInput_array.reshape((1,) + userInput_array.shape)

    cl_img = userInput.resize((256,256))
    cl_img_array = img_to_array(cl_img)
    cl_img_processed = cl_img_array.reshape((1,) + cl_img_array.shape)

    fakeImage = fakeImagesModel.predict(userInput_processed)

    classification = imageClassificationModel(cl_img_processed)
    categories = ['accommodation', 'city', 'culture', 'cuisine', 'nature']
    predicted_label_index = np.argmax(classification)
    predicted_label = categories[predicted_label_index]

    return jsonify({'probability_of_fake': float(fakeImage[0][0]), 'classification' : predicted_label})

if __name__ == '__main__':
    app.run(debug=True)
