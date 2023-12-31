import json
import imaplib
import email
from email.header import decode_header
import os

def emails_to_json(username, password, sender_email):
    """
    Fetch emails from a specific sender and save them to a JSON file.

    :param username: Email account username
    :param password: Email account password
    :param sender_email: The sender's email address to filter messages
    """

    # Create an IMAP4 class with SSL
    mail = imaplib.IMAP4_SSL("imap.gmail.com")

    # Authenticate
    mail.login(username, password)

    # Select the mailbox you want to check (INBOX, spam, etc.)
    mail.select("inbox")

    # Search for specific mails from the sender
    # Search for specific mails from the sender
    status, messages = mail.search(None, f'FROM "{sender_email}"')

    status, messages2 = mail.search(None, f'TO "{sender_email}"')

    # Convert messages to a list of email IDs
    messages = messages[0].split(b' ')
    messages2 = messages2[0].split(b' ')

    messages = messages + messages2

    emails = []  # List to store email dictionaries

    for mail_id in messages:
        # Fetch the email body (RFC822) for the given ID
        status, data = mail.fetch(mail_id, '(RFC822)')

        # Parse the email content
        message = email.message_from_bytes(data[0][1])

        # Decode the email subject
        subject = decode_header(message["subject"])[0][0]
        if isinstance(subject, bytes):
            subject = subject.decode()

        # Email sender
        from_ = message.get("from")
        
        # Get the email body
        body = ""
        if message.is_multipart():
            for part in message.walk():
                content_type = part.get_content_type()
                content_disposition = str(part.get("Content-Disposition"))
                try:
                    body = part.get_payload(decode=True).decode()
                except:
                    pass
                if "attachment" not in content_disposition and content_type == "text/plain":
                    emails.append({"subject": subject, "from": from_, "content": body})
                    break
        else:
            # extract content from non-multipart emails
            content_type = message.get_content_type()
            body = message.get_payload(decode=True).decode()
            if content_type == "text/plain":
                emails.append({"subject": subject, "from": from_, "content": body})

    # Write emails to a JSON file
    with open("data_json/email_" + sender_email.split("@")[0] +  ".json", "w", encoding='utf-8') as file:
        json.dump(emails, file, indent=4, ensure_ascii=False)

    # Close the connection and logout
    mail.close()
    mail.logout()

## Example usage
emails_to_json('priyaagarwal.bcg@gmail.com', 'sisxhvvpqevweftz', '22adhira@gmail.com')
emails_to_json('priyaagarwal.bcg@gmail.com', 'sisxhvvpqevweftz', '28adhirac@gmail.com')