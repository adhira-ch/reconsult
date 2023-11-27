import React, { useState, useRef, useEffect } from 'react';
import temp from '../art_assets/temp.png';
import post_it from '../art_assets/post_it.png';
import { Alert } from '@material-tailwind/react';
import { logDOM } from '@testing-library/react';
import logo from '../art_assets/logo_sprite.png'
import { useNavigate } from 'react-router-dom';
import test from '../art_assets/test.png';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13,
  };

function Modal({ onClose, onSubmit, fileName, text, setText, setFileName, setFile, file, status, companyName, projects}) {
    const modalRef = useRef();
    const [loading, setLoading] = useState(false);
    const [receivedId, setReceivedId] = useState(null);
    const navigate = useNavigate();

    const handleProjectSubmit = ({id, status, name}) => {
        navigate('/project_page', { state: {emailList: 'priyaagarwal.bcg@gmail.com, 22adhira@gmail.com, ryanrey@pfizer.com', desc: '', title: name, id: id, cmp: companyName, stage: 'Initial Contact', status: status} });
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
                setLoading(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="modal-overlay fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay Background */}
        <div className="fixed inset-0 bg-black bg-opacity-[0.4] transition-opacity duration-1000" aria-hidden="true"></div>

        {/* Modal Content */}
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Spacer Element */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Modal Box */}
            <div ref={modalRef} className="inline-block align-bottom bg-transparent rounded-3xl text-left overflow-hidden transform transition-transform duration-1000 sm:align-middle sm:max-w-2xl sm:w-[40vw] justify-center items-center">
                {!loading && (
                    <>
                        {/* Project List Section */}
                        <div className="bg-one px-4 pt-5 shadow-none p-5">
                            {/* Project List */}
                            <div className="text-center text-2xl text-white">
                                {companyName}'s Projects
                            </div>
                            <ProjectsList projects={projects} handleProjectSubmit={handleProjectSubmit}/>
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
</div>
    );
}


function Modal_Create({ onClose, onSubmit, fileName, text, setText, setFileName, setFile, file, status, companyName}) {
    const modalRef = useRef();
    const [loading, setLoading] = useState(false);
    const [receivedId, setReceivedId] = useState(null);
    const navigate = useNavigate();

    const [emailList, setEmailList] = useState('');

    const handleEmailListChange = (event) => {
        setEmailList(event.target.value);
    };

    const [title, setTitle] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const [desc, setDesc] = useState('');

    const handleDesc = (event) => {
        setDesc(event.target.value);
    };
    const containsAtSymbol = () => {
        return emailList.includes('@') && emailList.includes('.');
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const [tags, setTags] = useState([{ id: 'Initial Contact', text: 'Initial Contact' }]);

    const handleDelete = (i) => {
        setTags((prevTags) => prevTags.filter((tag, index) => index !== i));
      };
    
      const handleAddition = (tag) => {
        if (!tags.find(t => t.id === tag.id)) {
            setTags((prevTags) => [...prevTags, tag]);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var stage=''
        if (tags){
        var stage = tags.map(tag => tag.text).join('; ');
        }
        if (!title | !emailList | !desc | title == '' | emailList == '' | desc == '' | !containsAtSymbol | stage == '') {
            alert('Please set up the Project!');
            return;
        }
        navigate('/project_page', { state: {emailList: emailList, desc: desc, title: title, id: '10', stage: stage, cmp: companyName, status: status} });
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
                setLoading(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="modal-overlay fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay Background */}
        <div className="fixed inset-0 bg-black bg-opacity-[0.4] transition-opacity duration-1000" aria-hidden="true"></div>

        {/* Modal Content */}
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Spacer Element */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Modal Box */}
            <div ref={modalRef} className="inline-block align-bottom bg-transparent rounded-3xl text-left overflow-hidden transform transition-transform duration-1000 sm:align-middle sm:max-w-2xl sm:w-xl justify-center items-center w-[50vw]">
                {!loading && (
                    <div className="bg-one p-8 shadow-none h-full">
                        <div className="text-center text-2xl text-white">
                            New {companyName} Project
                        </div>
                        <form onSubmit={handleSubmit}>
                        {/* Email List Input */}
                        <div className="relative rounded-lg shadow-sm mt-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            >
                            <path d="M16.5 11c2.5 0 4.5 2 4.5 4.5 0 .88-.25 1.71-.69 2.4l3.08 3.1L22 22.39l-3.12-3.07c-.69.43-1.51.68-2.38.68-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 000 5 2.5 2.5 0 000-5m-6 5H3V8l7.62 4.76A6.486 6.486 0 0116.5 9c.27 0 .54 0 .81.06L19 8v1.5c.75.31 1.42.77 2 1.32V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h8.82c-.55-.58-1-1.25-1.32-2M19 6l-8 5-8-5h16z" />
                            </svg>
                                {/* Replace with actual SVG */}
                            </div>
                            <input 
                                type="text" 
                                placeholder="Enter emails separated by commas"
                                onChange={handleEmailListChange}
                                value={emailList} 
                                className="pl-10 pr-4 bg-gray-100 border border-gray-300 text-black text-lg rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            />
                        </div>
                        {/* Project Name Input */}
                        <div className="relative rounded-lg shadow-sm mt-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                viewBox="0 0 1024 1024"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                                >
                                <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Project Name" 
                                onChange={handleTitleChange}
                                value={title}
                                className="pl-10 pr-4 bg-gray-100 border border-gray-300 text-black text-lg rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            />
                        </div>
                        
                        <div className="relative rounded-lg shadow-sm mt-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-start pointer-events-none pt-4">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                                >
                                <path d="M16.5 11L13 7.5l1.4-1.4 2.1 2.1L20.7 4l1.4 1.4-5.6 5.6M11 7H2v2h9V7m10 6.4L19.6 12 17 14.6 14.4 12 13 13.4l2.6 2.6-2.6 2.6 1.4 1.4 2.6-2.6 2.6 2.6 1.4-1.4-2.6-2.6 2.6-2.6M11 15H2v2h9v-2z" />
                                </svg>
                            </div>
                            
                            <ReactTags
                                tags={tags}
                                suggestions={[]}
                                delimiters={delimiters}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                inputFieldPosition="top"
                                autocomplete={false}
                                classNames={{
                                    tags: 'my-2',
                                    tagInput: 'border border-gray-300 rounded-lg',
                                    tagInputField: 'pl-10 pr-4 bg-gray-100 text-black text-lg rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5',
                                    selected: 'bg-transparent p-4',
                                    tag: 'bg-blue-100 border-gray-300 rounded text-black p-2',
                                    remove: 'text-gray-700 hover:text-gray-900 ml-2 cursor-pointer',
                                }}
                                />
                        </div>
                        {/* Project Description Input */}
                        <div className="relative rounded-lg shadow-sm mt-4">
                            <textarea 
                                placeholder="Brief Description" 
                                className="p-5 bg-gray-100 border border-gray-300 text-black text-lg rounded-lg focus:ring-black focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                rows="3"
                                onChange={handleDesc}
                                value={desc}
                            ></textarea>
                        </div>
                        <div className="mt-4 flex justify-center">
                        <button 
                            type="submit" 
                            className="w-1/4 bg-two text-white py-2 px-4 rounded hover:bg-three rounded-full"
                        >
                            Create
                        </button>
                    </div>
                </form>
                    </div>
                )}
            </div>
        </div>
    </div>
</div>
    );
}


function ProjectButton({ name, description, status, handleProjectSubmit, id}) {
    return (
      <button className="w-full mb-4 text-black hover:bg-white/[0.7] rounded-md flex flex-row h-fit bg-white" onClick={() => {handleProjectSubmit({id, status, name})}}>
        <span className='w-5/6 flex px-4 py-2 flex-col justify-center'>
          {name}
          <hr className='w-1/2 self-center'/>
          <span className='text-sm'>{description}</span>
        </span>
        <span className='ring-one/[0.5] flex w-1/6 h-full rounded-md ring-4' style={{backgroundColor: status}}></span>
      </button>
    );
  }
  


  function ProjectsList({ projects, handleProjectSubmit}) {
    return (
      <div className="flex flex-col items-center w-full h-80 justify-center p-5">
        {projects.map((project, index) => (
          <ProjectButton 
            key={index} 
            name={project.name} 
            description={project.description} 
            status={project.status}// or whatever logic you have for status
            handleProjectSubmit={handleProjectSubmit}
            id = {project.id}
          />
        ))}
      </div>
    );
  }
  
  

function Tile(props) {
    const { username, id, link, label, video_path, status, sector, capabilities, companyName, projects} = props;
    const defaultImage = temp;
    const userImage = temp;
    const displayImage = (username && id) ? userImage : defaultImage;

    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalCreateOpen, setModalCreateOpen] = useState(false);
    const [fileName, setFileName] = useState('');
    const [text, setText] = useState('');
    const [file, setFile] = useState(null); // Instead of fileName, store the entire file

    const closeModal = () => {
        setModalOpen(false);
    };
    const closeCreateModal = () => {
        setModalCreateOpen(false);
    };
    const handleSubmit = () => {
        if (!text || !fileName) {
            alert('Please provide both text and a file.');
            return;
        }
        closeModal();
    };

    return (
        <div className='flex flex-col items-center w-fit h-fit p-4'>
            <div className="w-fit h-fit">
                <button className='rounded-md hover:ring-2 hover:ring-black/[0.5] hover:shadow-lg hover:ring-4 transition-shadow duration-300 shadow-lg h-fit w-80 flex flex-col bg-four'>
                    <div className='flex flex-row w-full'><span className='h-14 w-1/6 bg-one ring-4 p-2 justify-center items-center flex flex-end rounded-md' style={{backgroundColor: status}}></span><span className='flex flex-center w-4/6 p-5 justify-center text-lg'>{label}</span><button className='h-14 w-1/6 ring-4 p-2 justify-center items-center flex flex-end rounded-md bg-two/[0.3]' onClick={() => setModalCreateOpen(true)}><img src={test}></img></button></div>
                    <div className='p-3 justify-center flex flex-col mx-auto items-center h-full' onClick={() => setModalOpen(true)}>
                    <img src={(video_path == null? displayImage : video_path)} alt={username || "Default"} className='h-32 w-auto m-3'/>
                    <div className='w-full justify-center p-2 text-lg mb-2'><b>Industry: </b> <span className='bg-three p-2 rounded-md'>{sector}</span></div>
                    </div>
                </button>
            </div>
            <div className='text-center text-xl py-3'>
                {isModalOpen && <Modal onClose={closeModal} onSubmit={handleSubmit} fileName={fileName} text={text} setText={setText} setFileName={setFileName} setFile={setFile} file={file} status={status} companyName={companyName} projects={projects}/>}
            </div>
            <div className='text-center text-xl py-3'>
                {isModalCreateOpen && <Modal_Create onClose={closeCreateModal} onSubmit={handleSubmit} fileName={fileName} text={text} setText={setText} setFileName={setFileName} setFile={setFile} file={file} status={status} companyName={companyName}/>}
            </div>
        </div>
    );
}

export default Tile;