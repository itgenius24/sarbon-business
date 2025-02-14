"use client";
import { AnimatePresence, motion } from "framer-motion";

export const Animation = ({ children, ...props }) => {
  return <motion.div {...props}>{children}</motion.div>;
};

export const MotionSection = ({ children, ...props }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.section>
  );
};
export const AnimatePresenceMotion = ({ children, ...props }) => {
  return (
    <AnimatePresence mode="wait" {...props}>
      {children}
    </AnimatePresence>
  );
};

export const MotionH1 = ({ children, ...props }) => {
  return <motion.h1 {...props}>{children}</motion.h1>;
};

export const MotionP = ({ children, ...props }) => {
  return <motion.p {...props}>{children}</motion.p>;
};

export const MotionUl = ({ children, ...props }) => {
  return <motion.ul {...props}>{children}</motion.ul>;
};

export const MotionLi = ({ children, ...props }) => {
  return <motion.li {...props}>{children}</motion.li>;
};

export const MotionSpan = ({ children, ...props }) => {
  return <motion.span {...props}>{children}</motion.span>;
};
