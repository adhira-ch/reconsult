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
    { email: 'example1@email.com', name: 'John' },
    { email: 'example2@email.com', name: 'Jane' },
    { email: 'example3@email.com', name: 'Joe' },
    { email: 'example4@email.com', name: 'Jack' },
    // ... more entries ...
  ];


  function ProjectButton({ date, full_text, recipient, sender, subject, summary, type, handleProjectSubmit, status, label, setModalOpen, setModalCreateOpen, video_path, username, sector }) {
    return (
      <div className='flex flex-col items-center w-full h-fit'>
        <div className="w-full h-fit">
          <button 
            className='rounded-md hover:ring-2 hover:ring-black/[0.5] hover:shadow-lg hover:ring-2 transition-shadow duration-300 shadow-lg h-fit w-full flex flex-col bg-four'
            onClick={() => handleProjectSubmit({date, full_text, recipient, sender, subject, summary, type})}
          >
            <div className='flex flex-row w-full'>
              <span className='h-10 w-10 bg-one flex flex-end rounded-md ring-1 ring-black' style={{backgroundColor: status}}></span>
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
    );
  }
  
  
function ProjectsList({projects, handleProjectSubmit}) {
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
          />
        ))}
      </div>
    );
  }
  





function LeftPanel({ companyName, email_addresses, title, status}) {
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

  const handleProjectSubmit = ({date, full_text, recipient, sender, subject, summary, type}) => {
    alert('here');

  };

    const getNameByEmail = (email) => {
        const entry = emailToNameMapping.find(entry => entry.email === email);
        return entry ? entry.name : 'Unknown';
      };



    return (
      <div className="flex-grow w-full h-full rounded-md p-4 flex flex-col justify-center items-center text-black">
        {/* Company Name */}
        <div className="text-xl mb-6 text-center">
          {companyName}: <span className='p-2 bg-one text-white rounded-md'>{title}</span>
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
          <span className='h-12 w-fit bg-[#4F46E5] p-2 justify-center items-center flex rounded-md'>Mails: {activeTab}</span>
        </div>
        <div className="overflow-auto" style={{ maxHeight: '50%' }}>
          <ProjectsList projects={emails} handleProjectSubmit={handleProjectSubmit} />
        </div>
      </div>
    </div>

    {/* Bottom Half Section */}
    <div className="flex-1 bg-one/[0.1] rounded-md p-2">
      {/* Content for the bottom half */}
      <div className="text-white flex-col">
        <div className='flex flex-row w-full'>
          <span className='h-12 w-fit bg-[#4F46E5] p-2 justify-center items-center flex rounded-md'>Meetings: {activeTab}</span>
        </div>
        <div className="overflow-auto" style={{ maxHeight: '50%' }}>
          <ProjectsList projects={meetings} handleProjectSubmit={handleProjectSubmit} />
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
  
function Main_App() {
    const location = useLocation();
    const [receivedId, setReceivedId] = useState(location.state.id);
    const [emailList, setEmailList] = useState(location.state.emailList);
    const [desc, setDesc] = useState(location.state.desc);
    const [title, setTitle] = useState(location.state.title);
    const [stage, setStage] = useState(location.state.stage);
    const [cmp, setCmp] = useState(location.state.cmp);
    const [status, setStatus] = useState(location.state.cmp);
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
            <div className="flex-grow flex flex-row bg-four/[0.6] rounded-3xl w-full mx-auto justify-center items-center p-4 h-[78vh]">
                {/* Left Section */}
                <div className="flex-grow w-1/3 h-full rounded-md"> {/* Change bg-blue-500 to your desired color */}
                    <LeftPanel companyName={cmp} email_addresses={emailList} title={title}/>
                </div>
                
                <div className="flex-grow w-1/3 bg-four h-full rounded-md"> {/* Change bg-blue-500 to your desired color */}
                    {/* Content for the left section */}
                </div>

                {/* Right Section */}
                <div className="w-1/3 h-full rounded-md"> {/* Change bg-green-500 to your desired color */}
                    {/* Content for the right section */}
                    <iframe className='w-full h-full rounded-md' src="http://127.0.0.1:7860"></iframe>
                </div>
            </div>

            </div>
            </div>
        </motion.div>
    );
}

export default Main_App;

