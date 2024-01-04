"use client";

import Modal from "@/components/modal/Modal";
import { motion } from "framer-motion";

export default function page() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, type: "spring" }}
    >
      <Modal />
    </motion.div>
  );
}
