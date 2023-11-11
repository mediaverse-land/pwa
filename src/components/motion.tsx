"use client";
import { motion } from "framer-motion";
const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};
const Motion = ({
  children,
  center,
  fullHeight,
}: {
  children: React.ReactNode;
  center?: boolean;
  fullHeight?: boolean;
}) => {
  return (
    <motion.main
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ duration: 1.5 }} // Set the transition to linear
      className={`${center ? "flex items-center justify-center" : ""} ${
        fullHeight ? "h-full" : ""
      }`}
    >
      {children}
    </motion.main>
  );
};

export default Motion;
