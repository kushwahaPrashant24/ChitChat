import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { userAppStore } from "@/Store";
import { getColor } from "@/lib/utils";
import { HOST } from "@/utils/constants";

export default function Index() {
  const { userInfo } = userAppStore();

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
    <div className="absolute bottom-0 h-16 flex items-center justify-center px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
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
            {
                userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}`
                : "" 
            }
        </div>
      </div>
    <div className="flex gap-5 "> 
    
    </div>
    </div>
  );
}
