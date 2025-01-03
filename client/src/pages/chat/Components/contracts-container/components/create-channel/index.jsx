import React, { useState } from "react";
import { useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";
import { animationDefaultOption } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { SEARCH_CONTACTS_ROUTES, HOST, GET_ALL_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { userAppStore } from "@/Store";
import { getColor } from "@/lib/utils";
import { use } from "react";
import { Button } from "@/components/ui/button";
import Select from 'react-select'

export default function CreateChannel() {
  const { setSelectedChatType, setSelectedChatData } = userAppStore();
  const [newChannelModel, setNewChannelModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
   const getData = async () => {
    const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES, { withCredentials: true });
   setAllContacts(response.data.contacts);
   
  };
  getData();
  }, []);

  console.log("Default Options:", allContacts);
console.log("Selected Contacts:", selectedContacts);



  const createChannel = async () => {};

 



  return (
    <>
      {/* Tooltip for Add Contact */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setNewChannelModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
             Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Dialog for Contact Selection */}
      <Dialog open={newChannelModel} onOpenChange={setNewChannelModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please Fill the Channel Details</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          {/* Search Input */}
          <div>
            <Input
              placeholder="Channel Name"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />

          </div>
          <div>
          <Select
  className="rounded-lg py-2"
  options={allContacts}
  isMulti={true}
  placeholder="Select Contacts"
  value={selectedContacts}
  onChange={setSelectedContacts}
  emptyIndicator={
    <p className="text-center text-lg leading-10">No Contacts Found</p>
  }
  styles={{
    control: (base) => ({
      ...base,
      backgroundColor: '#1a1d26', // Dark color for the background
      borderColor: '#2c2e3b',     // Custom border color (if desired)
      color: '#fff',              // Text color
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: '#333',   // Darker option background on hover or selection
      color: '#fff',             // Text color for options
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aaa',             // Placeholder text color
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#444',  // Background for selected values
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#fff',            // Text color for selected values
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#fff',            // Close button color
      ':hover': {
        backgroundColor: '#ff0000', // Hover color for remove button
      }
    }),
  }}
/>

          </div>
        <div>
        <Button className="w-full bg-purple-600 hover:bg-purple-900 transition-all duration-300  "
         onClick={createChannel}
         >Create Channel</Button>
        </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
