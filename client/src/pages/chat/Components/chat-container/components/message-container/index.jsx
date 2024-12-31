import { apiClient } from "@/lib/api-client";
import { userAppStore } from "@/Store";
import { GET_ALL_MESSAGES_ROUTES } from "@/utils/constants";
import moment from "moment";
import { useEffect, useRef } from "react";
import { HOST } from "@/utils/constants";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

function MessageContainer() {
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    selectedChatMessages,
    setSelectedChatMessages,
  } = userAppStore();

  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_ALL_MESSAGES_ROUTES,
          { id: selectedChatData._id },
          { withCredentials: true }
        );
        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const checkIfImage = (filePath) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|tif|svg|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const downloadFile = async (file) => {
    const response = await apiClient.get(`${HOST}/${file}`, {
      responseType: "blob",
    });
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", file.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
  };

  const renderDMMessages = (message) => (
    <div
      className={`${
        message?.sender === selectedChatData?._id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData?._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-white/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}
      {message.messageType === "file" && (
        <div
          className={`${
            message.sender !== selectedChatData?._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-white/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {checkIfImage(message.fileUrl) ? (
            <div
              className="cursor-pointer"
              onClick={() => {
                setImageUrl(true);
                setShowImage(message.fileUrl);
              }}
            >
              <img
                src={`${HOST}/${message.fileUrl}`}
                alt="file preview"
                className="object-cover w-[300px] h-[300px] bg-black"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <span className="text-3xl text-white/8 bg-black/20 rounded-full p-3">
                <MdFolderZip />
              </span>
              <span>{message.fileUrl.split("/").pop()}</span>
              <span
                className="bg-black/20 rounded-full p-3 text-2xl hover:bg-black/50 hover:text-white cursor-pointer transition-all duration-300"
                onClick={() => downloadFile(message.fileUrl)}
              >
                <IoMdArrowRoundDown />
              </span>
            </div>
          )}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[75vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef}></div>
      {showImage && (
        <div className="fixed z-[1000] top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center backdrop-blur-lg flex-col bg-black/50 "
         onClick={() => setShowImage(false)}>
          <div>
            <img
              src={`${HOST}/${showImage}`}
              alt="image"
              className="h-[80vh] w-full bg-cover "
            />
            <div className="flex gap-5 fixed top-0 mt-5">
              <button className="bg-black/20 rounded-full p-3 text-2xl hover:bg-black/50 hover:text-white cursor-pointer transition-all duration-300"
              onClick={() => downloadFile(showImage)}
              >
                <IoMdArrowRoundDown />
              </button>
              <button
                onClick={() => setShowImage(false)}
                className="bg-black/20 rounded-full p-3 text-2xl hover:bg-black/50 hover:text-white cursor-pointer transition-all duration-300"
              >
                <IoCloseSharp />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageContainer;
