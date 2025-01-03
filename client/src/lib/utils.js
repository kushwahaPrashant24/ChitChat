import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import animationData from "@/assets/lottie-json"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#ffd60a2a] text-[#ffd60a] border-[1px] border-[#ffd68abb]",
  "bg-[#06d6a02a] text-[#06d6a0] border-[1px] border-[#06d6a0bb]",
  "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]",
  "bg-[#caffbf2a] text-[#a3ff73] border-[1px] border-[#a3ff73bb]",
  /* "bg-[#ffadad2a] text-[#ff4d4d] border-[1px] border-[#ff4d4dbb]",
  
  "bg-[#bdb2ff2a] text-[#9b5de5] border-[1px] border-[#9b5de5bb]",
  "bg-[#ffbfca2a] text-[#ff6b6b] border-[1px] border-[#ff6b6bbb]",
  "bg-[#ffd3a42a] text-[#ff9770] border-[1px] border-[#ff9770bb]",
  "bg-[#caf0f82a] text-[#00b4d8] border-[1px] border-[#00b4d8bb]",
  "bg-[#e2f0cb2a] text-[#99d98c] border-[1px] border-[#99d98cbb]",
  "bg-[#e0c3fc2a] text-[#d28efd] border-[1px] border-[#d28efdbb]",
  "bg-[#ffc6ff2a] text-[#c77dff] border-[1px] border-[#c77dffbb]",
  "bg-[#ff9e9e2a] text-[#ff4949] border-[1px] border-[#ff4949bb]"*/
];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0]; /// Fatihack to the first color if out of range };
};


export const animationDefaultOption = {
  loop: true,
  autoplay:true,
  animationData, 
}