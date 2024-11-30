import { userAppStore } from "@/Store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useId, useRef } from "react";
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

        return () => {
          socket.current.disconnect();
        };
      }
    }
  }, [userInfo]);

  return(
    <SocketContext.Provider value={socket.current}>
        {children}
    </SocketContext.Provider>
  )
};
