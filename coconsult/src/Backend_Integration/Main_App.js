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

function Main_App() {
    const location = useLocation();
    const [receivedId, setReceivedId] = useState(location.state.id);
    const [emailList, setEmailList] = useState(location.state.emailList);
    const [desc, setDesc] = useState(location.state.desc);
    const [title, setTitle] = useState(location.state.title);
    const [stage, setStage] = useState(location.state.stage);
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
            <div className="flex-grow flex flex-row bg-four/[0.6] rounded-3xl w-full mx-auto justify-center items-center p-4 h-[75vh]"></div>
            </div>
            </div>
        </motion.div>
    );
}

export default Main_App;

