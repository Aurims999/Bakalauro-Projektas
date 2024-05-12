from flask import Flask, jsonify, request
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

fakeImagesModel = load_model('./models/Images/AI-Images/AI-Image-Detection.h5')
imageClassificationModel = load_model('./models/Images/Image-Categorize/image_classification.h5')
deepFakes = load_model('./models/Images/Deepfake/DeepFakeDetector.h5')

@app.route('/')
def base():
    return 'AI BE is working!'

def processImage(request):
    if 'image' not in request.files:
        return jsonify({'error': 'No image found in the request'}), 400

    image_file = request.files['image']

    userInput = Image.open(image_file)

    cl_img = userInput.resize((256,256))
    cl_img_array = img_to_array(cl_img)

    if cl_img_array.shape[-1] != 3:
        cl_img_array = np.concatenate([cl_img_array] * 3, axis=-1)

    cl_img_processed = cl_img_array.reshape((1,) + cl_img_array.shape)
    return cl_img_processed

@app.route('/evaluateImage', methods=['POST'])
def evaluate_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image found in the request'}), 400

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

@app.route('/evaluateProfilePic', methods=['POST'])
def evaluate_profilePic():
    img = processImage(request)
    probDeepFake = deepFakes.predict(img)
    probDeepFake = float(probDeepFake[0][0])
    return jsonify({'probability_of_fake': probDeepFake})

if __name__ == '__main__':
    app.run(debug=True)
