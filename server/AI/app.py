from flask import Flask, jsonify, request
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import tensorflow as tf

from transformers import pipeline
from google.cloud import vision
import tempfile
import shutil

import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './models/CloudVision/tripshare-423520-d96d736ba453.json'

fakeImagesModel = load_model('./models/Images/AI-Images/AI-Image-Detection.h5')
imageClassificationModel = load_model('./models/Images/Image-Categorize/image_classification.h5')
deepFakes = load_model('./models/Images/Deepfake/DeepFakeDetector.h5')

distilled_student_sentiment_classifier = pipeline(
    model="lxyuan/distilbert-base-multilingual-cased-sentiments-student", 
    return_all_scores=True
    )

@app.route('/')
def base():
    return 'AI BE is working!'

def processImage(request):
    if 'image' not in request.files:
        return jsonify({'error': 'No image found in the request'}), 400

    image_file = request.files['image']

    userInput = Image.open(image_file)

    cl_img = userInput.resize((256,256))
    cl_img_array = tf.keras.preprocessing.image.img_to_array(cl_img)

    if cl_img_array.shape[-1] != 3:
        cl_img_array = np.concatenate([cl_img_array] * 3, axis=-1)

    cl_img_processed = cl_img_array.reshape((1,) + cl_img_array.shape)
    return cl_img_processed

def detect_labels(path):
    """Detects labels in the file."""
    from google.cloud import vision

    client = vision.ImageAnnotatorClient()

    with open(path, "rb") as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.label_detection(image=image)
    labels = response.label_annotations
    print("Labels:")

    for label in labels:
        print(label.description)

    if response.error.message:
        raise Exception(
            "{}\nFor more info on error messages, check: "
            "https://cloud.google.com/apis/design/errors".format(response.error.message)
        )
    
    return [label.description for label in labels[:5]]

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
    userInput_array = tf.keras.preprocessing.image.img_to_array(userInput_cropped)
    userInput_processed = userInput_array.reshape((1,) + userInput_array.shape)

    cl_img = userInput.resize((256,256))
    cl_img_array = tf.keras.preprocessing.image.img_to_array(cl_img)
    cl_img_processed = cl_img_array.reshape((1,) + cl_img_array.shape)

    fakeImage = fakeImagesModel.predict(userInput_processed)

    classification = imageClassificationModel(cl_img_processed)
    categories = ['accommodation', 'city', 'culture', 'cuisine', 'nature']
    predicted_label_index = np.argmax(classification)
    predicted_label = categories[predicted_label_index]

    temp_dir = tempfile.mkdtemp()
    temp_image_path = os.path.join(temp_dir, 'cropped_image.jpg')
    userInput.save(temp_image_path)

    tags = detect_labels(temp_image_path)

    shutil.rmtree(temp_dir)

    return jsonify({'probability_of_fake': float(fakeImage[0][0]), 'classification' : predicted_label, 'tags' : tags})

@app.route('/evaluateProfilePic', methods=['POST'])
def evaluate_profilePic():
    img = processImage(request)
    probDeepFake = deepFakes.predict(img)
    probDeepFake = float(probDeepFake[0][0])
    return jsonify({'probability_of_fake': probDeepFake})

@app.route('/evaluateComment', methods=['POST'])
def evaluate_comment():
    print("TEST")
    if 'text' not in request.json:
        return jsonify({'error': 'No comment was received in BE'}), 400

    text = request.json['text']

    result = distilled_student_sentiment_classifier(text)
    sentiment_scores = result[0]
    negative_score = next((score['score'] for score in sentiment_scores if score['label'] == 'negative'), 0.0)
    
    if negative_score >= 0.65:
        response = 'SUSPENDED'
    else:
        response = 'SAFE'

    return jsonify({'status': response})


if __name__ == '__main__':
    app.run(debug=True)
