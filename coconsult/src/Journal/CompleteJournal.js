import React from 'react';
//import Login from './LoginComponent'; // Assuming you have a component named Login
import AppNavbar from '../Navigation/AppNavbar'; // Your Navbar component
import gif from '../art_assets/logo_gif.gif'
import brushes from '../art_assets/brushes.png'
import Tile from './Tile';

import coke from '../art_assets/coke.png'
import google from '../art_assets/google.png'
import bcg from '../art_assets/bcg.png'
import atdc from '../art_assets/atdc.png'
import hd from '../art_assets/hd.png'
import nvidia from '../art_assets/nvidia.png'
import pfizer from '../art_assets/pfizer.png'
import ge from '../art_assets/ge.png'

import { motion } from 'framer-motion';

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

function CompleteJournal() {
    
    const pfizerProjects = [
        { name: 'Project Lightspeed', description: 'Innovative Research & Development', status: '#E5B70D', id: '1'},
        { name: 'Pfizer\'s IT organization', description: 'Digital & Data Analytics', status: '#00C7B7', id:'2'},
        { name: 'Pfizer\'s Agile Transformation', description: 'Scaling of Digital Technologies', status:'#E5B70D', id: '3'}
      ];
      const hfProjects = [
        { name: 'AI-Enhanced Sustainability Analytics', description: 'Climate Change and Sustainability', status: '#FE504F', id: '4'},
        { name: 'Diversity and Inclusion Sentiment Analysis', description: 'Customer Insights', status: '#E5B70D', id: '5'},
        { name: 'AI-Driven Risk Management Solutions', description: 'Risk Management and Compliance', status:'#FE504F', id: '6'}
      ];
      const anthropicProjects = [
        { name: 'AI-Enhanced Crisis Management System', description: 'Business Resilience', status: '#00C7B7', id: '7'},
        { name: 'Ethical AI Framework', description: 'International Business', status: '#00C7B7', id: '8'},
        { name: 'AI-Powered Talent Development and Management', description: 'People Strategy', status:'#00C7B7', id: '9'}
      ];
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
        <div className="h-screen flex flex-col px-4 py-4">
            {/* Navbar */}
            <div className="w-4/5 mx-auto my-4">
                <AppNavbar />
            </div>
            <div className='flex flex-col items-center justify-center p-4'>
            {/* Main content */}
            <div className="flex-grow flex flex-row bg-four/[0.6] rounded-3xl w-4/5 mx-auto justify-center items-center p-4 h-[65vh]">
                <Tile label="3 Active Projects" video_path={pfizer} status={'#E5B70D'} sector={'Healthcare'} capabilities={'Customer Insights + Digital, Technology, and Data'} companyName={'Pfizer'} projects={pfizerProjects}/>
                <Tile label="1 Active Projects" video_path={atdc} status={'#FE504F'} sector={'Technology & Media'} capabilities={'Digital, Technology, and Data +  Innovation Strategy and Delivery'} companyName={'Hugging Face'} projects={hfProjects}/>
                <Tile label="2 Active Projects" video_path={bcg} status={'#00C7B7'} sector={'Technology & Media'} capabilities={'Innovation Strategy and Delivery + Operations'} companyName={'Anthropic'} projects={anthropicProjects}/>
                {/* ... add as many Tiles as you need */}
            </div>
            </div>
        </div>
        </motion.div>
    );
}

export default CompleteJournal;