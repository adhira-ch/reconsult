import os
import json

def read_file_content(file_path):
    """ Read and return the content of a file. """
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def create_json_from_data_and_insights(data_directory, insights_directory):
    combined_list = []

    # Create a dictionary of data transcripts
    data_transcripts = {file_name.replace(".txt", ""): read_file_content(os.path.join(data_directory, file_name))
                        for file_name in os.listdir(data_directory) if file_name.endswith(".txt")}

    for file_name in os.listdir(insights_directory):
        if file_name.endswith("_insights.txt"):
            # Determine the type based on the file name
            insight_type = "Meeting" if "meeting" in file_name.lower() else "Email"

            # Construct the id by removing "_insights.txt" from the file name
            # The id is used to match the transcript file
            insight_id = file_name.replace("_insights.txt", "")

            # Read the content of the insight file
            summary = read_file_content(os.path.join(insights_directory, file_name))

            # Get the corresponding full text from the data transcripts
            full_text = data_transcripts.get(insight_id, "Full text not found.")

            # Create a dictionary for the JSON object
            combined_dict = {
                "type": insight_type,
                "id": insight_id,
                "summary": summary,
                "full text": full_text
            }

            # Add the dictionary to the list
            combined_list.append(combined_dict)

    # Convert the list to JSON
    json_object = json.dumps(combined_list, indent=4)
    return json_object

# Example usage
data_directory = 'data/data'
insights_directory = 'data/insights'
json_output = create_json_from_data_and_insights(data_directory, insights_directory)
print(json_output)