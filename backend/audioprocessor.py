import os
import openai
import torch
import time
from moviepy.editor import VideoFileClip
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline
from pydub import AudioSegment
from concurrent.futures import ThreadPoolExecutor


device = "cuda:0" if torch.cuda.is_available() else "cpu"
torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32
model_id = "openai/whisper-large-v3"
model = AutoModelForSpeechSeq2Seq.from_pretrained(
    model_id, torch_dtype=torch_dtype, low_cpu_mem_usage=True
)
model.to(device)
processor = AutoProcessor.from_pretrained(model_id)
pipe = pipeline(
    "automatic-speech-recognition",
    model=model,
    tokenizer=processor.tokenizer,
    feature_extractor=processor.feature_extractor,
    device=device,
)

def transcribe_chunk(chunk, index, pipe):
    temp_file = f"temp_chunk_{index}.wav"
    chunk.export(temp_file, format="wav")
    try:
        result = pipe(temp_file)
        transcript = result["text"]
    finally:
        os.remove(temp_file)
    return transcript

def process_video_file(input_video_path):
    # Extract the base name and create the audio file path
    base_name = os.path.splitext(os.path.basename(input_video_path))[0]
    audio_file_path = base_name + "_audio.mp3"

    # Extract audio from the video file
    try:
        video_clip = VideoFileClip(input_video_path)
        audio_clip = video_clip.audio
        audio_clip.write_audiofile(audio_file_path)
        audio_clip.close()
        video_clip.close()
    except Exception as e:
        print("Error in extracting audio:", e)
        return None

    # Use the existing process_audio_file function
    return process_audio_file(audio_file_path)

def process_audio_file(input_file_path):
    audio = AudioSegment.from_file(input_file_path)
    chunk_length_ms = 60000
    chunks = [audio[i:i + chunk_length_ms] for i in range(0, len(audio), chunk_length_ms)]

    start_time = time.time()
    full_transcript = ""
    with ThreadPoolExecutor(max_workers=20) as executor:  # Adjust the number of workers as needed
        futures = [executor.submit(transcribe_chunk, chunk, i, pipe) for i, chunk in enumerate(chunks)]
        for future in futures:
            print("Reached new chunk")
            full_transcript += future.result() + " "

    # Save the combined transcript
    output_folder = "data"
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    end_time = time.time()
    total_time = end_time - start_time
    base_name = os.path.splitext(os.path.basename(input_file_path))[0]
    output_file_path = os.path.join(output_folder, "meeting_" + base_name + "_transcript.txt")

    with open(output_file_path, 'w') as file:
        file.write(full_transcript)
    print(f"Transcript saved to {output_file_path}")
    return "DONE in "+str(total_time)
    # insight_request = "With the following meeting transcript provide the following information to use as business notes which are specific & quantifiable (similar to automated meeting minutes): A summary of the meeting (focused on prospects, business, etc), People in attendance (record names of people in attendance & conversations do not include names like Speaker 1, etc look for names in conversation of transcript), Key business insights , problems identified, deadlines, & specific information in bullets (go into detail as you can), Potential actionable insights for managers/consultants/engineers (based on the information). Transcript below"
    # transcript_with_prompt = insight_request + full_transcript
    # openai.api_key = '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'

    # insights = ""
    # try:
    #     gpt_response = openai.ChatCompletion.create(
    #         model="gpt-3.5-turbo",  # Replace with appropriate GPT-4 model
    #         messages=[
    #             {"role": "system", "content": "You are a helpful assistant."},
    #             {"role": "user", "content": transcript_with_prompt}
    #         ]
    #     )
    #     insights = gpt_response.choices[0].message["content"]

    #     insights_file_path = os.path.join(output_folder, base_name + "_insights.txt")
    #     with open(insights_file_path, 'w') as insights_file:
    #         insights_file.write(insights)
    #     print(f"Insights saved to {insights_file_path}")
    # except Exception as e:
    #     print("Error in generating insights:", e)
    
    # return (output_file_path, insights_file_path)

# Test function
#sample_file = "mock_interview_audio.mp3"
#print(process_audio_file(sample_file))