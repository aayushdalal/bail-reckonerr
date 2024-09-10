import requests

# Define the input data (example)
input_data = {
    'Crime_Type': 'Drug-Related',
    'Socio_Economic_Status': 'High',
    'Time_Served_Months': 26,
    'Prior_Criminal_History': 4,
    'Risk_of_Flight':0.06561489845 ,
    'Influence_on_Trial': 0.0053164563457
}

# Send a POST request to the Flask API
response = requests.post('http://127.0.0.1:5000/predict', json=input_data)

# Print the result
print(response.json())
