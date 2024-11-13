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
        id="logo-c"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer part of the C */}
        <motion.path
          d="M40 10C22.5 10 10 22.5 10 40C10 57.5 22.5 70 40 70"
          fill="none"
          stroke="#8338ec"
          strokeWidth="16"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        {/* Inner part of the C */}
        <motion.path
          d="M40 20C27.5 20 20 27.5 20 40C20 52.5 27.5 60 40 60"
          fill="none"
          stroke="#975aed"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />
      </motion.svg>
      <motion.span
        className="text-3xl font-semibold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        ChitChat
      </motion.span>
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
