from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Load your trained model
model = joblib.load('final_voting_clf_model.pkl')  # Make sure this path points to your model file

# Define the prediction route
@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the request
    data = request.json

    # Convert the JSON data into a Pandas DataFrame (must match the format used during training)
    input_data = pd.DataFrame([data])

    # Make a prediction using your model)
    prediction_proba = model.predict_proba(input_data)

    bail_probability = prediction_proba[0][1]*100

    # Prepare the response
    response = {
        'bail_probability': bail_probability  # Convert NumPy array to a list
    }

    # Return the result as a JSON response
    return jsonify(response)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
