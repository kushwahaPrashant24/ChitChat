import React from "react";
import { motion } from "framer-motion";

function ContractContainer() {
  return (
    <div className="relative md:w-[35vw] lg:w-[35vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full ">
      <div className="pt-5">
        <Logo />
      </div>
      <div className=" my-5 ">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Message" />
        </div>
      </div>
      <div className=" my-5 ">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div>
    </div>
  );
}

export default ContractContainer;

const Logo = () => {
  return (
    <motion.div
      className="flex p-5 justify-start items-center gap-2"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.svg
        id="logo-chitchat"
        width="1200"
        height="120"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Adding "ChitChat" as the main element */}
        <motion.text
          x="40%"
          y="40%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#8338ec"
          fontSize="20"
          fontWeight="bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          ChitChat
        </motion.text>
      </motion.svg>
    </motion.div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className=" uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-60 text-sm ">
      {text}
    </h6>
  );
};
