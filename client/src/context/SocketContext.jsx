import { userAppStore } from "@/Store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = userAppStore();

  useEffect(() => {
    if (userInfo) {
      if (userInfo) {
        socket.current = io(HOST, {
          withCredentials: true,
          query: { userId: userInfo.id },
        });

        socket.current.on("connect", () => {
          console.log("connect to socket server");
        });

        const handleRecievedMessage = (message) => {
             const {selectedChatData, selectedChatType, addMessage} = userAppStore.getState();

             if (selectedChatType !== undefined && (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id)) {
              console.log("message rcv", message)
               addMessage(message)
            }
        };

        socket.current.on("recieveMessage", handleRecievedMessage);
        socket.current.on("connect", () => {
          console.log("Connected to the socket server with ID:", socket.current.id);
        });

        return () => {
          socket.current.disconnect();
        };
      }
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
