from pathlib import Path
from llama_index import SimpleDirectoryReader, GPTVectorStoreIndex, ServiceContext, StorageContext, LLMPredictor
from llama_index.query_engine.router_query_engine import RouterQueryEngine
from llama_index.selectors.llm_selectors import LLMSingleSelector
from langchain.chat_models import ChatOpenAI
import gradio as gr
from llama_index.query_engine import CitationQueryEngine
import os
import time

# Set your OpenAI API key
os.environ["OPENAI_API_KEY"] = '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'

# Constants
DATA_DIRECTORY = "../data/data"

# Set service context
llm_predictor_gpt4 = LLMPredictor(llm=ChatOpenAI(temperature=0, model_name="gpt-4"))
service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor_gpt4, chunk_size_limit=1024)

# Function to build vector index for all files
def build_vector_index(index_name):
    file_paths = [f for f in Path(DATA_DIRECTORY).glob("*.txt")]
    documents = [doc for f in file_paths for doc in SimpleDirectoryReader(input_files=[str(f)]).load_data()]

    storage_context = StorageContext.from_defaults()
    vector_index = GPTVectorStoreIndex.from_documents(
        documents, 
        service_context=service_context,
        storage_context=storage_context,
    )
    vector_index.index_struct.index_id = index_name
    storage_context.persist(persist_dir=f'./storage/{index_name}')
    return vector_index

# Build vector index for all documents
all_documents_index = build_vector_index("all_documents")

# Build query engine for the index
citation_query_engine = CitationQueryEngine.from_args(
    all_documents_index,
    similarity_top_k=3,
    # here we can control how granular citation sources are, the default is 512
    citation_chunk_size=512,
)


# Define the Gradio interface function
def query_chatbot(question):
    response = citation_query_engine.query(question)
    return str(response)

def gradio_interface(question, history):
    # Your existing logic to handle the query
    response = query_chatbot(question)

    # Update the conversation history
    new_history = f"{history}\n\nYou: {question}\n\nChatbot: {response}" if history else f"You: {question}\n\nChatbot: {response}"
    return new_history

with gr.Blocks(theme='WeixuanYuan/Base_dark') as demo:    
    chatbot = gr.Chatbot()
    msg = gr.Textbox(placeholder="Type your message here...")
    clear = gr.ClearButton([msg, chatbot])

    def respond(message, history):
        bot_message = query_chatbot(message)
        history.append((message, bot_message))
        time.sleep(2)
        return "", history
    
    msg.submit(respond, [msg, chatbot], [msg, chatbot])


# Launch the Gradio app
demo.launch()
