import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { userAppStore } from "@/Store";
import { getColor } from "@/lib/utils";
import { HOST } from "@/utils/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoLogOut, IoPowerSharp } from "react-icons/io5";


export default function Index() {
  const { userInfo } = userAppStore();
  const navigate = useNavigate();


  const LogOut = async => {

  }

  // Debugging
  console.log("User Info:", userInfo);

  // Dynamic URL or fallback
  const profileImage = userInfo?.image ? `${HOST}/${userInfo.image}` : null;
  const userInitial = userInfo?.firstName
    ? userInfo.firstName.charAt(0).toUpperCase()
    : userInfo?.email
    ? userInfo.email.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-between">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {profileImage ? (
              // Render dynamic image
              <img
                src={profileImage}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              // Render initials if image is missing
              <div
                className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full text-white ${getColor(
                  userInfo?.color || "gray"
                )}`}
              >
                {userInitial}
              </div>
            )}
          </Avatar>
        </div>
        <div className="">
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5 ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2 className="text-purple-500  text-xl font-medium " 
                onClick={()=> navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white ">
              Edit profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp className="text-r-500  text-xl font-medium " 
                onClick={()=> navigate(LogOut)}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white ">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
