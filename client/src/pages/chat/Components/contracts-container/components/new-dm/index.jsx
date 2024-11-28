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

export default function index() {
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContact, setSearchedContact] = useState([]);

  const searchContact = async (searchTerm) => {};

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className=" text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300 "
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white ">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col ">
          <DialogHeader>
            <DialogTitle> Please Select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search contact"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none "
              onChange={(e) => searchContact(e.target.value)}
            />
          </div>
          {searchedContact.length <= 0 && (
            <div>
              <div className=" flex-1 md:flex flex-col justify-center items-center  duration-1000 transition-all ">
                <Lottie
                  onClickToPauseDisable={true}
                  height={100}
                  width={100}
                  options={animationDefaultOption}
                />
                <div className=" text-opacity-80 text-purple-200  flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center ">
                  <h3 className=" poppins-medium">
                    Hi <span className=" text-purple-500 ">!</span> Search New{" "}
                    <span className=" text-purple-500 ">Contact .</span> 
                  </h3>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
