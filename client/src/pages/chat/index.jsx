import { userAppStore } from "@/Store";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Chat() {
  const { userInfo } = userAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if(!userInfo.profileSetup) {
      toast("Please setup profile to continue");
      navigate("/profile")
    }
  }, [userInfo, navigate]);

  return <div>cHAT</div>;
}

export default Chat;
