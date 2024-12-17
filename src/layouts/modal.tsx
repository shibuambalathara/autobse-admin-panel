import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-md shadow-md p-6 w-full max-w-md mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors text-xl font-bold"
        >
          ✕
        </button>
        {/* Modal Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          {title}
        </h2>
        {/* Content Area */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
