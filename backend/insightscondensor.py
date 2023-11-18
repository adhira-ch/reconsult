import os
import json
import re

def read_file_content(file_path):
    """ Read and return the content of a file. """
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def extract_subject_and_date(full_text):
    """ Extract subject and date from the full text. Adjust the regular expressions based on the actual format. """
    # Adjust these regular expressions based on the actual format of your data
    subject_match = re.search(r"Subject: (.*)", full_text)
    date_match = re.search(r"Date: (.*)", full_text)

    subject = subject_match.group(1) if subject_match else "Subject not found"
    date = date_match.group(1) if date_match else "Date not found"
    return subject, date

def create_json_from_data_and_insights(data_directory, insights_directory):
    combined_list = []

    # Mapping of data transcripts with their file names (without the .txt extension)
    data_transcripts = {file_name.replace(".txt", ""): read_file_content(os.path.join(data_directory, file_name))
                        for file_name in os.listdir(data_directory) if file_name.endswith(".txt")}

    for file_name in os.listdir(insights_directory):
        if file_name.endswith("_insights.txt"):
            # Determine the type and ID based on the file name
            insight_type = "Meeting" if "meeting" in file_name.lower() else "Email"
            # Remove "_insights" from the file name to match with the data transcript file
            insight_id = file_name.replace("_insights.txt", "")

            # Read the content of the insight file
            summary = read_file_content(os.path.join(insights_directory, file_name))

            # Retrieve the corresponding full text from the data transcripts
            full_text = data_transcripts.get(insight_id, "Full text not found.")

            # Extract subject and date from the full text
            subject, date = extract_subject_and_date(full_text)

            # Create and add the combined data-insight dictionary to the list
            combined_list.append({
                "type": insight_type,
                "subject": subject,
                "date": date,
                "summary": summary,
                "full text": full_text
            })

    # Convert the list to a JSON-formatted string
    return json.dumps(combined_list, indent=4)

# Example usage
data_directory = 'data/data'
insights_directory = 'data/insights'
json_output = create_json_from_data_and_insights(data_directory, insights_directory)
print(json_output)