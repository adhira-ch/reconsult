import imaplib
import email
from email.header import decode_header
import os

def fetch_emails(username, password, sender_email):
    """
    Fetch and save emails from a specific sender to a text file.

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
    status, messages = mail.search(None, f'FROM "{sender_email}"')

    # Convert messages to a list of email IDs
    messages = messages[0].split(b' ')

    # Open a file to save the emails
    with open(os.path.join("data", "email_" + sender_email.split("@")[0] + ".txt"), "w", encoding='utf-8') as file:
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
                        # write text/plain emails and skip attachments
                        file.write(f"Subject: {subject}\n")
                        file.write(f"From: {from_}\n")
                        file.write(f"Content:\n{body}\n\n")
                        break
            else:
                # extract content from non-multipart emails
                content_type = message.get_content_type()
                body = message.get_payload(decode=True).decode()
                if content_type == "text/plain":
                    file.write(f"Subject: {subject}\n")
                    file.write(f"From: {from_}\n")
                    file.write(f"Content:\n{body}\n\n")
            
            file.write("\n" + "-"*40 + "\n\n")


    # Close the connection and logout
    mail.close()
    mail.logout()

# Example usage
fetch_emails('ryanpunamiya@gmail.com', 'dkzervgguwekwili', 'eliam.medina@gmail.com')

