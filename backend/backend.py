from flask import Flask, jsonify
from flask_cors import CORS  # To handle Cross-Origin Resource Sharing (CORS)
import os
import json
import re
from insightscondensor import create_json_from_data_and_insights  # Import the function

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/get-insights', methods=['GET'])
def get_insights():
    data_directory = 'data/raw'
    insights_directory = 'data/insights'
    json_output = create_json_from_data_and_insights(data_directory, insights_directory)
    return jsonify(json.loads(json_output))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
