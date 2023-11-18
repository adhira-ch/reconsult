import os
import openai
import torch
import time
from moviepy.editor import VideoFileClip
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline
from pydub import AudioSegment
from concurrent.futures import ThreadPoolExecutor

# Define constants and model
device = "cuda:0" if torch.cuda.is_available() else "cpu"
torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32
model_id = "openai/whisper-large-v3"
model = AutoModelForSpeechSeq2Seq.from_pretrained(model_id, torch_dtype=torch_dtype, low_cpu_mem_usage=True)
model.to(device)
processor = AutoProcessor.from_pretrained(model_id)
pipe = pipeline("automatic-speech-recognition", model=model, tokenizer=processor.tokenizer, feature_extractor=processor.feature_extractor, device=device)

# Function to transcribe chunks of audio
def transcribe_chunk(chunk, index, pipe):
    temp_file = f"data/raw/temp_chunk_{index}.wav"
    chunk.export(temp_file, format="wav")
    try:
        result = pipe(temp_file)
        transcript = result["text"]
    finally:
        os.remove(temp_file)
    return transcript

# Function to convert video to audio
def video_to_audio(input_video_path):
    base_name = os.path.splitext(os.path.basename(input_video_path))[0]
    audio_file_path = f"data/raw/{base_name}_audio.mp3"
    try:
        video_clip = VideoFileClip(input_video_path)
        audio_clip = video_clip.audio
        audio_clip.write_audiofile(audio_file_path)
        audio_clip.close()
        video_clip.close()
        return audio_file_path
    except Exception as e:
        print("Error in extracting audio:", e)
        return None

# Function to process audio file and transcribe it
def audio_to_transcript(input_file_path, file_name):
    audio = AudioSegment.from_file(input_file_path)
    chunk_length_ms = 60000
    chunks = [audio[i:i + chunk_length_ms] for i in range(0, len(audio), chunk_length_ms)]

    start_time = time.time()
    full_transcript = ""
    with ThreadPoolExecutor(max_workers=20) as executor:
        futures = [executor.submit(transcribe_chunk, chunk, i, pipe) for i, chunk in enumerate(chunks)]
        for future in futures:
            full_transcript += future.result() + " "

    output_folder = "data/data"
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    output_file_path = os.path.join(output_folder, f"{file_name}.txt")

    with open(output_file_path, 'w') as file:
        file.write(full_transcript)
    print(f"Transcript saved to {output_file_path}")
    return output_file_path

# Function to convert video to transcript
def video_to_transcript(input_video_path, file_name):
    audio_file_path = video_to_audio(input_video_path)
    if audio_file_path:
        return audio_to_transcript(audio_file_path, file_name)
    else:
        return None

# Function to generate insights from a transcript
def transcript_to_insights(transcript_file_path, file_name):
    with open(transcript_file_path, 'r') as file:
        full_transcript = file.read()
    if "meeting" in file_name.lower():
        insight_request = "With the following meeting transcript provide the following information to use as business notes which are specific & quantifiable: A summary of the meeting, people in attendance, key business insights, problems identified, deadlines, and specific information in bullets. Potential actionable insights for managers/consultants/engineers. Transcript below:\n" + full_transcript
    else:
        insight_request = "With the following email transcript provide the following information to use as business notes which are specific & quantifiable: A short summary of the email (message), people in correspondence, actionable items /next steps (if any for managers/consultants/engineers). Transcript below:\n" + full_transcript
    openai.api_key = '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'

    insights = ""
    try:
        gpt_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Replace with appropriate GPT-4 model
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": insight_request}
            ]
        )
        insights = gpt_response.choices[0].message["content"]

        insights_folder = "data/insights"
        if not os.path.exists(insights_folder):
            os.makedirs(insights_folder)
        file_name_new = file_name.replace(".txt","")
        insights_file_path = os.path.join(insights_folder, f"{file_name_new}_insights.txt")
        with open(insights_file_path, 'w') as insights_file:
            insights_file.write(insights)
        print(f"Insights saved to {insights_file_path}")
    except Exception as e:
        print("Error in generating insights:", e)

# Example Usage
# video_transcript_path = video_to_transcript("path_to_video.mp4", "meeting_name")
# insights_path = transcript_to_insights(video_transcript_path, "meeting_name")
transcript_to_insights("data/data/email_6.txt", "email_6.txt")