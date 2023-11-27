import React from 'react';
import NavbarDefault from '../Navigation/AppNavbar';
import logo_sprite from '../art_assets/logo_sprite.png';
import brushes from '../art_assets/brushes.png';
import { useEffect, useState, useRef } from 'react';
import { ColorPicker, useColor } from "react-color-palette";
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import "react-color-palette/css";
import { Slider } from "@material-tailwind/react";
import { CirclePicker } from 'react-color';
import { usePalette } from 'color-thief-react';
import record from '../art_assets/record.png';
import 'react-circular-progressbar/dist/styles.css';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// Radial separators
import RadialSeparators from "./RadialSeparators";

// ...
const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
};

const emailToNameMapping = [
    { email: 'priyaagarwal.bcg@gmail.com', name: 'Priya' },
    { email: '22adhira@gmail.com', name: 'Adhira' },
    { email: 'ryanrey@pfizer.com', name: 'Ryan' },
    { email: 'example4@email.com', name: 'Jack' },
    // ... more entries ...
  ];


  function ProjectButton({ date, full_text, recipient, sender, subject, summary, type, handleProjectSubmit, status, label, setModalOpen, setModalCreateOpen, video_path, username, sector, activeTab}) {
    return (<>
      {((sender && activeTab && sender.includes(activeTab)) || (recipient && activeTab && recipient.includes(activeTab)) || type === 'Meeting') &&
      <div className='flex flex-col items-center w-full h-fit'>
        <div className="w-full h-fit">
          <button 
            className='rounded-md hover:ring-2 hover:ring-black/[0.5] hover:shadow-lg hover:ring-2 transition-shadow duration-300 shadow-lg h-fit w-full flex flex-col bg-four'
            onClick={() => handleProjectSubmit({date, full_text, recipient, sender, subject, summary, type, status})}
          >
            <div className='flex flex-row w-full'>
              <span className='h-10 w-10 bg-one flex flex-end rounded-md ring-1 ring-transparent' style={{backgroundColor: status}}></span>
              <span className='flex flex-grow p-1 justify-center text-base text-black w-full'>{subject}</span>
            </div>
            <div className='p-1 justify-center flex flex-col mx-auto items-center w-full'>
                <hr className='w-3/4 h-2 text-black'></hr>
              <div className='w-full justify-center text-base mb-2 text-black font-bold'>{date}</div>
            </div>
          </button>
        </div>
        <div className='text-center text-xl py-1.5'>
        </div>
      </div>
      }</>
    );
  }
  
  
function ProjectsList({projects, handleProjectSubmit, activeTab}) {
    return (
      <div className="flex flex-col items-center w-full justify-center p-5">
        {projects.map((project, index) => (
          <ProjectButton 
            key={index}
            id={project.id}
            date={project.date}
            full_text={project.full_text}
            recipient={project.recipient}
            sender={project.sender}
            subject={project.subject}
            summary={project.summary}
            type={project.type}
            handleProjectSubmit={handleProjectSubmit}
            status={project.status}
            activeTab={activeTab}
          />
        ))}
      </div>
    );
  }
  





function LeftPanel({ companyName, email_addresses, title, status, handleProjectSubmit, tag}) {
    const emailTabs = email_addresses.split(', ');
    const [activeTab, setActiveTab] = useState(emailTabs[0]);
  
    const [meetings, setMeetings] = useState([]);
    const [emails, setEmails] = useState([]);
  useEffect(() => {
    // Fetch data from your API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get-insights');
        const data = await response.json();

        // Filter data for meetings and emails
        setMeetings(data.filter(item => item.type === 'Meeting'));
        setEmails(data.filter(item => item.type === 'Email'));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

    const getNameByEmail = (email) => {
        const entry = emailToNameMapping.find(entry => entry.email === email);
        return entry ? entry.name : 'Unknown';
      };



    return (
      <div className="flex-grow w-full h-full rounded-md p-4 flex flex-col justify-center items-center text-black">
        {/* Company Name */}
        <div className="text-xl mb-6 text-center">
          {companyName}: <span className='p-2 bg-one text-white rounded-md'>{title}</span>&nbsp;&nbsp;<span className='p-2 bg-two text-white rounded-md'>{tag}</span>
        </div>
  
        {/* Tab Structure */}
        <div className="flex mb-6 w-full">
            {emailTabs.map((email, index) => (
                <div
                key={index}
                className={`flex-grow text-center py-2 px-4 cursor-pointer ${activeTab === email ? 'bg-one text-white' : 'bg-white hover:bg-four'} rounded-md mx-1`}
                onClick={() => setActiveTab(email)}
                >
                {getNameByEmail(email)}
                </div>
            ))}
            </div>

  
        {/* Filtered Content Based on Active Tab */}
        <div className="flex-grow w-full overflow-auto">
  <div className="flex flex-col h-full space-y-4">
    {/* Top Half Section */}
    <div className="flex-1 bg-one/[0.1] rounded-md p-2">
      {/* Content for the top half */}
      <div className="text-white flex-col">
        <div className='flex flex-row w-full'>
          <span className='h-12 w-2/3 bg-[#4F46E5] p-2 justify-center items-center flex rounded-md'>Mails: {activeTab}</span>
          <span className='h-12 w-1/5 p-2 justify-center items-center flex rounded-md font-light'></span>
          <img className='h-12 p-2 justify-center items-center flex rounded-md font-light' src={record}/>
        </div>
        <div className="overflow-auto" style={{ maxHeight: '50%' }}>
          <ProjectsList projects={emails} handleProjectSubmit={handleProjectSubmit} activeTab={activeTab}/>
        </div>
      </div>
    </div>

    {/* Bottom Half Section */}
    <div className="flex-1 bg-one/[0.1] rounded-md p-2">
      {/* Content for the bottom half */}
      <div className="text-white flex-col">
        <div className='flex flex-row w-full'>
          <span className='h-12 w-2/3 bg-[#4F46E5] p-2 justify-center items-center flex rounded-md'>Mails: {activeTab}</span>
          <span className='h-12 w-1/5 p-2 justify-center items-center flex rounded-md font-light'></span>
          <img className='h-12 p-2 justify-center items-center flex rounded-md font-light' src={record}/>
        </div>
        <div className="overflow-auto" style={{ maxHeight: '50%' }}>
          <ProjectsList projects={meetings} handleProjectSubmit={handleProjectSubmit} activeTab={activeTab}/>
        </div>
      </div>
    </div>
  </div>
</div>



  
        {/* Other components here */}
        {/* ... */}
      </div>
    );
  }

  function Modal({ date, full_text, recipient, sender, subject, summary, type, status, label, closeModal, onClose }) {
    const modalRef = useRef();
    const [isAccordionOpen, setIsAccordionOpen] = useState({ summary: false, fullText: false });

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const toggleAccordion = (section) => {
        setIsAccordionOpen(prevState => ({ ...prevState, [section]: !prevState[section] }));
    };

    return (
        <div className="modal-overlay fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen text-center sm:block">
                {/* Overlay Background */}
                <div className="fixed inset-0 bg-black bg-opacity-50"></div>

                {/* Modal Content */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                    <div ref={modalRef} className="bg-gray-100 p-5 max-h-[80vh] overflow-y-auto">
                        {/* Subject */}
                        <div className="text-xl font-semibold text-black mb-2">
                            {subject}
                        </div>

                        {/* Email Metadata */}
                        <div className="mb-4 text-sm text-black">
                            {sender && <p><strong>From:</strong> {sender}</p>}
                            {recipient && <p><strong>To:</strong> {recipient}</p>}
                        </div>

                        {/* Accordion Container */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Accordion for Summary */}
                            <div className="accordion-item col-span-1">
                                <button
                                    className="accordion-header bg-one p-2 w-full text-left text-white font-semibold rounded-md"
                                    onClick={() => toggleAccordion('summary')}
                                >
                                    Summarized
                                </button>
                                {isAccordionOpen.summary && (
                                    <div className="accordion-body border border-gray-300">
                                      <iframe 
                                            srcdoc={`
                                              <style>
                                                @font-face {
                                                  font-family: 'vango';
                                                  src: url('../art_assets/LeagueSpartan-VariableFont_wght.ttf'),
                                                }
                                                body {
                                                  font-family: 'vango', sans-serif;
                                                }
                                              </style>
                                              ${summary}
                                            `}
                                            className='w-full h-80 overflow-auto'
                                          />
                                    </div>
                                )}
                            </div>

                            {/* Accordion for Full Text */}
                            <div className="accordion-item col-span-1">
                                <button
                                    className="accordion-header bg-one p-2 w-full text-left text-white font-semibold rounded-md"
                                    onClick={() => toggleAccordion('fullText')}
                                >
                                    Original Email
                                </button>
                                {isAccordionOpen.fullText && (
                                    <div className="accordion-body border border-gray-300">
                                    <iframe 
                                            srcdoc={`
                                              <style>
                                                @font-face {
                                                  font-family: 'vango';
                                                  src: url('../art_assets/LeagueSpartan-VariableFont_wght.ttf'),
                                                }
                                                body {
                                                  font-family: 'vango', sans-serif;
                                                }
                                              </style>
                                              ${full_text}
                                            `}
                                            className='w-full h-80 overflow-auto'
                                          />
                                  </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function Main_App() {
    const location = useLocation();
    const [receivedId, setReceivedId] = useState(location.state.id);
    const [emailList, setEmailList] = useState(location.state.emailList);
    const [desc, setDesc] = useState(location.state.desc);
    const [title, setTitle] = useState(location.state.title);
    const [stage, setStage] = useState(location.state.stage);
    const [cmp, setCmp] = useState(location.state.cmp);
    const [status, setStatus] = useState(location.state.cmp);

    const [date, setDate] = useState('');
    const [full_text, setText] = useState('');
    const [recipient, setRecipient] = useState('');
    const [sender, setSender] = useState('');
    const [subject, setSubject] = useState('');
    const [summary, setSummary] = useState('');
    const [type, setType] = useState('');
    const [status_obj, setStatus_obj] = useState('');

    const handleProjectSubmit = ({date, full_text, recipient, sender, subject, summary, type, status}) => {
      setDate(date);
      setText(full_text);
      setRecipient(recipient);
      setSender(sender);
      setSubject(subject);
      setSummary(summary);
      setType(type);
      setStatus_obj(status);
      setModalOpen(true);
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
      setModalOpen(false);
    };





    return (
      <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="h-screen flex flex-col px-4 py-4"> 
        <div className="w-4/5 mx-auto my-4">
          <NavbarDefault />
        </div>
        <div className='flex flex-col items-center justify-center p-4'>
          {/* Main content */}
          <div className="flex-grow flex flex-row bg-four/[0.6] rounded-3xl w-full mx-auto justify-center items-center py-5 px-3 h-[75vh]">
            {/* Left Section */}
            <div className="flex flex-col w-1/3 h-full rounded-md px-3"> 
              <LeftPanel companyName={cmp} email_addresses={emailList} title={title} handleProjectSubmit={handleProjectSubmit} tag={stage}/>
            </div>
            
            {/* Middle Section */}
            <div className="flex flex-col w-1/3 h-full rounded-md pr-5 items-center pt-8">
    <div className='flex'>
        <CircularProgressbarWithChildren
            value={81}
            text={`${81}%`}
            strokeWidth={10}
            styles={buildStyles({
                strokeLinecap: "butt",
                pathColor: "#003371", // Stroke color of the progress path
                textColor: "#003371", // Text color
                trailColor: "#d6d6d6" // Trail (background) color
            })}
        >
            <RadialSeparators
                count={12}
                style={{
                    background: "#fff",
                    width: "2px",
                    height: `${10}%`
                }}
            />
        </CircularProgressbarWithChildren>
    </div>

    {/* Criteria Met Label */}
    <div className="text-center mt-4 w-full justify-center">
        <span className="text-2xl font-semibold">Client Criteria Met</span> {/* Increased font size to text-2xl */}
    </div>

    <div className="flex mt-5 w-full h-full bg-four rounded-lg shadow-lg">
    {/* Important Deadlines Section */}
    <div className="flex flex-col w-1/3 pr-2 justify-center items-center bg-one rounded-l-lg p-4">
        <h3 className="text-lg font-bold mb-4 text-white flex flex-col">Found Deadlines</h3>
        <div className="flex items-center">
                <input type="checkbox" id="task2" className="accent-three" />
                <label htmlFor="task2" className="ml-2 text-white">
                    Draft Proposal (11/28/2023)
                </label>
        </div>
    </div>

    {/* Action Tasks Section */}
    <div className="flex flex-col w-2/3 justify-center items-center bg-two rounded-r-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-white">Action Tasks</h3>
        <div className="space-y-3 text-base">
            <div className="flex items-center justify-center">
                <input type="checkbox" id="task1" className="accent-three" />
                <label htmlFor="task1" className="ml-2 text-white">
                    Colin Scott: Financial Breakdown & Risk Management
                </label>
            </div>
            <div className="flex items-center">
                <input type="checkbox" id="task2" className="accent-three" />
                <label htmlFor="task2" className="ml-2 text-white">
                    Kiara Sanders: Migration Strategy & Security Plan
                </label>
            </div>
            <div className="text-white font-bolder">
                Goal: Draft for internal review by next week
            </div>
        </div>
    </div>

    </div>
</div>

    
            {/* Right Section */}
            <div className="flex flex-col w-1/3 h-full rounded-md px-3">
              <iframe className='w-full h-full rounded-md' src="http://127.0.0.1:7860"></iframe>
            </div>
          </div>
          <div className='text-center text-xl py-3'>
            {isModalOpen && <Modal onClose={closeModal} 
              date = {date}
              full_text={full_text}
              recipient={recipient}
              sender={sender}
              subject={subject}
              summary={summary}
              type={type}
              status={status_obj}
            />}
          </div>
        </div>
      </div>
    </motion.div>
    );
}

export default Main_App;

