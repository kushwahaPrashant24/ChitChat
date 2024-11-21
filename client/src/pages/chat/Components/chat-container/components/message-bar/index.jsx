import { useEffect, useRef } from "react";

import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSad, IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

function MessageBar() {
  const emojiRef = useRef();

  const [message, setMessage] = useState("");

  const [emojiPikerOpen, setEmojiPikerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPikerOpen(false);
      }
    }
  
    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);
  
    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    console.log("Send");
  };

  return (
    <div className="h-[10vw] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6 ">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5]">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none "
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className=" text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all ">
          <GrAttachment className="text-2xl " />
        </button>
        <button
          onClick={() => setEmojiPikerOpen(true)}
          className=" text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all "
        >
          <RiEmojiStickerLine className="text-2xl " />
        </button>
        <div className="absolute bottom-16 right-0 " ref={emojiRef}>
          <EmojiPicker
            theme="dark"
            open={emojiPikerOpen}
            onEmojiClick={handleAddEmoji}
            autoFocusSearch={false}
          />
        </div>
      </div>
      <button
        onClick={handleSendMessage}
        className=" bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:outlinen text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all "
      >
        <IoSend className="text-2xl " />
      </button>
    </div>
  );
}

export default MessageBar;
