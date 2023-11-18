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

function LeftPanel({ companyName, emails }) {
    const emailTabs = emails.split(', ');
    const [activeTab, setActiveTab] = useState(emailTabs[0]);
  
    return (
      <div className="flex-grow w-full bg-two h-full rounded-md p-4 flex flex-col justify-center items-center">
        {/* Company Name */}
        <div className="text-2xl font-bold mb-6 text-center text-white">
          {companyName}
        </div>
  
        {/* Tab Structure */}
        <div className="flex mb-6 w-full">
            {emailTabs.map((email, index) => (
                <div
                key={index}
                className={`flex-grow text-center py-2 px-4 cursor-pointer ${activeTab === email ? 'bg-white' : 'bg-four/[0.8] hover:bg-four'} rounded-md mx-1`}
                onClick={() => setActiveTab(email)}
                >
                {email}
                </div>
            ))}
            </div>

  
        {/* Filtered Content Based on Active Tab */}
        <div className="flex-grow w-full bg-white overflow-auto rounded-md shadow-md">
            <div className="flex flex-col h-full">
                {/* Top Half Section */}
                <div className="flex-1 bg-one">
                {/* Content for the top half */}
                <div className="text-gray-700">
                    Mails for {activeTab}
                </div>
                </div>

                {/* Bottom Half Section */}
                <div className="flex-1">
                {/* Content for the bottom half */}
                <div className="text-gray-700 rounded-3xl">
                    Meetings for {activeTab}
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
                <div className="flex-grow w-1/3 bg-two h-full rounded-md"> {/* Change bg-blue-500 to your desired color */}
                    <LeftPanel companyName={cmp} emails={emailList} />
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

