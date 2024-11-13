import { userAppStore } from "@/Store";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EmptyChatContainer from "./Components/empty-chat-container";
import ChatContainer from "./Components/chat-container";
import ContractContainer from "./Components/contracts-container";

function Chat() {
  const { userInfo } = userAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className=" flex h-[100vh] text-white overflow-hidden ">
      <ContractContainer />
     {/*<EmptyChatContainer /> */}
      <ChatContainer />
    </div>
  );
}

export default Chat;
