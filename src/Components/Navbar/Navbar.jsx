// import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import UserLinks from "./UserLinks";
import React, { useRef, useState, useEffect, useContext } from "react";

import Chatbot from "../Main/ChatBot";
import { Button } from "@material-tailwind/react";
const Navbar = () => {
  const [isChatbotOpen, setChatbotOpen] = useState(false);

  const handleChatbotToggle = () => {
    setChatbotOpen(!isChatbotOpen);
  };
  return (
    <div className="flex justify-between items-center border-b border-gray-100 w-full px-44 py-2 ">
      <Link to="/">
        <div className="text-3xl font-extrabold text-gray-900 dark:text-white font-roboto">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-blue-gray-400">
            LeafLink
          </span>
        </div>
      </Link>
      {/* <div className="">
        <Button onClick={handleChatbotToggle}>Chatbot</Button>
      </div> */}
      <div className="flex justify-end ml-5">
          <Button
            color="blue"
            size="lg"
            ripple="light"
            onClick={handleChatbotToggle}
            rounded
            
          > 
            {/* Assuming you have a chatbot icon image */}
            <img
              src="https://www.economist.com/media-assets/image/1843_20230915_1843_CHATBOT_TEASER.jpg"
              alt="Chatbot Icon"
              className="w-12 h-8 rounded-md"
            />
          </Button>
        </div>

      {/* Render the Chatbot component when the button is clicked */}
      {isChatbotOpen && <Chatbot onClose={handleChatbotToggle} />}
      <div className="flex justify-center items-center mx-auto">
        <NavLinks></NavLinks>
      </div>
      <div>
        <UserLinks></UserLinks>
      </div>
    </div>
  );
};

export default Navbar;
