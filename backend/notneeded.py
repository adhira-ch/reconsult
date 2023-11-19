from flask import Flask, request, jsonify
import os
import string
import random
from werkzeug.utils import secure_filename
import audioprocessor

UPLOAD_DIRECTORY = 'input/'
ALLOWED_EXTENSIONS = {'mp3', 'wav', 'ogg'}

app = Flask(__name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def gen_random_filename():
    letters_and_digits = string.ascii_letters + string.digits
    return ''.join(random.choice(letters_and_digits) for _ in range(10))

@app.route('/process_audio', methods=['POST'])
def process_audio():
    """
    API endpoint to process an audio file and generate transcript and insights.
    
    Expects an audio file in the request.
    
    Returns:
        JSON response with paths to saved transcript and insights files.
    """
    try:
        # Check if the post request has the file part
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400
        
        file = request.files['file']

        # If user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if file and allowed_file(file.filename):
            filename = secure_filename(gen_random_filename() + '.' + file.filename.rsplit('.', 1)[1].lower())
            file_path = os.path.join(UPLOAD_DIRECTORY, filename)
            file.save(file_path)

            # Process the audio file using the function from audioprocessor.py
            transcript_path, insights_path = audioprocessor.process_audio_file(file_path)

            return jsonify({'transcript_path': transcript_path, 'insights_path': insights_path}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=6001)