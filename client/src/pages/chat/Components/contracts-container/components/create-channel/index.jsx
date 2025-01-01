import React, { useState } from "react";
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
import { SEARCH_CONTACTS_ROUTES, HOST } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { userAppStore } from "@/Store";
import { getColor } from "@/lib/utils";

export default function CreateChannel() {
  const { setSelectedChatType, setSelectedChatData } = userAppStore();
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data?.contacts) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.error(
        "Error fetching contacts:",
        error.response?.data || error.message
      );
    }
  };

  const selectNewContact = (contact) => {
    setOpenNewContactModel(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
  };

  return (
    <>
      {/* Tooltip for Add Contact */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Dialog for Contact Selection */}
      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please Select a Contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          {/* Search Input */}
          <div>
            <Input
              placeholder="Search contact"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
