import React, { ReactNode } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onAction: (action: "cancel" | "confirm") => void;
  title: string;
  children: ReactNode;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onAction,
  title,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay de fundo */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            className="fixed inset-0 z-40 bg-black bg-opacity-70"
            onClick={() => onAction("cancel")}
          />

          {/* Container do Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <div className="p-4">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                className="relative w-full max-w-lg p-6 mx-auto bg-[#1e1e1e] rounded-lg shadow-xl"
              >
                {/* Cabeçalho */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">{title}</h2>
                  <button
                    onClick={() => onAction("cancel")}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Conteúdo */}
                <div>{children}</div>

                {/* Rodapé com botões */}
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => onAction("cancel")}
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-800 rounded-md transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => onAction("confirm")}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
                  >
                    Confirmar
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
