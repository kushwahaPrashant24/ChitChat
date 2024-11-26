import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import { FaPlus } from 'react-icons/fa'
  

export default function index() {
  return (
    <>
        <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
        <FaPlus className=' text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300 '/>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

    </>
  )
}
