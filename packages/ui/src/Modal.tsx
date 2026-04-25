"use client";
import React, { useEffect } from "react";
import IconButton from "./IconButton";
import Button from "./Button";
import { AnimatePresence, motion } from "motion/react";

const Modal = ({
  open,
  close,
  unmount,
  children,
  title,
  confirmText,
}: {
  open: boolean;
  close: () => void;
  unmount: () => void;
  children: React.ReactNode;
  title: string;
  confirmText: string;
}) => {
  const onClose = () => {
    close();
    setTimeout(unmount, 600);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  return (
    <AnimatePresence key={open ? "open" : "close"}>
      {open && (
        <motion.div
          key="modal-backdrop"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="ui:fixed ui:inset-0 ui:z-50 ui:flex ui:items-center ui:justify-center ui:bg-slate-900/40 ui:p-4 ui:backdrop-blur-sm"
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="ui:relative ui:flex ui:max-h-[85vh] ui:w-full ui:flex-col ui:overflow-hidden ui:rounded-2xl ui:bg-white ui:shadow-2xl ui:ring-1 ui:ring-black/5 ui:lg:max-w-3xl"
          >
            <header className="ui:flex ui:flex-none ui:items-center ui:justify-between  ui:bg-white/80 ui:px-6 ui:py-4 ui:backdrop-blur">
              <h2 className="ui:text-lg ui:font-bold ui:text-slate-800">
                {title}
              </h2>
              <IconButton
                icon="close"
                size="lg"
                aria-label="Close"
                onClick={onClose}
              />
            </header>

            <div className="ui:flex-1 ui:overflow-y-auto ui:bg-white ui:px-8 ui:py-8">
              <div className="ui:prose ui:prose-slate ui:prose-sm ui:max-w-none">
                {children}
              </div>
            </div>

            <div className="ui:flex ui:flex-none ui:justify-end ui:px-6 ui:py-4">
              <Button size="sm" onClick={onClose}>
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
