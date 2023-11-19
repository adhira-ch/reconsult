import os
import json
import re
def read_file_content(file_path):
    """ Read and return the content of a file. """
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def extract_email_details(full_text):
    """ Extract subject, date, sender, and recipient from the full text. """
    subject_match = re.search(r"Subject: (.*)", full_text)
    date_match = re.search(r"Date: (.*)", full_text)
    sender_match = re.search(r"From: (.*)", full_text)
    recipient_match = re.search(r"To: (.*)", full_text)

    subject = subject_match.group(1) if subject_match else "Subject not found"
    date = date_match.group(1) if date_match else "Date not found"
    sender = sender_match.group(1) if sender_match else "Sender not found"
    recipient = recipient_match.group(1) if recipient_match else "Recipient not found"
    return subject, date, sender, recipient

def create_json_from_data_and_insights(data_directory, insights_directory):
    combined_list = []
    count = 1
    # Mapping of data transcripts with their file names (without the .txt extension)
    data_transcripts = {file_name.replace(".txt", ""): read_file_content(os.path.join(data_directory, file_name))
                        for file_name in os.listdir(data_directory) if file_name.endswith(".txt")}

    for file_name in os.listdir(insights_directory):
        if file_name.endswith("_insights.txt"):
            insight_type = "Meeting" if "meeting" in file_name.lower() else "Email"
            insight_id = file_name.replace("_insights.txt", "")

            summary = read_file_content(os.path.join(insights_directory, file_name))
            full_text = data_transcripts.get(insight_id, "Full text not found.")
            if insight_type == "Email":
                subject, date, sender, recipient = extract_email_details(full_text)
                combined_list.append({
                    "id": count,
                    "type": insight_type,
                    "subject": subject,
                    "date": date,
                    "sender": sender,
                    "recipient": recipient,
                    "summary": summary,
                    "full text": full_text
                })
            else:  # For meetings, sender and recipient are not applicable
                subject, date, _, _ = extract_email_details(full_text)
                combined_list.append({
                    "id": count,
                    "type": insight_type,
                    "subject": subject,
                    "date": date,
                    "summary": summary,
                    "full text": full_text
                })
        count = count + 1

    return json.dumps(combined_list, indent=4)

# Example usage
# data_directory = 'data/raw'
# insights_directory = 'data/insights'
# json_output = create_json_from_data_and_insights(data_directory, insights_directory)
# print(json_output)