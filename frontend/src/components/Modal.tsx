import React, { ReactNode } from "react";
import { GiCrossMark } from "react-icons/gi";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  date?: string;
  customTitle?: ReactNode;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  date,
  children,
  customTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed bg-slate-100 inset-0 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-slate-300 rounded-lg shadow-2xl w-full max-w-[1000px] max-h-[600px] mx-4 md:mx-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <header className="flex justify-between items-center p-4 border-b border-slate-500">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {date && <p className="font-mono text-lg font-bold">{date}</p>}
          {customTitle && <p>{customTitle}</p>}
          
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
            aria-label="Close modal"
          >
            <GiCrossMark size={25} />
          </button>
        </header>

        <div className="p-4">{children}</div>

        <footer className="flex justify-end p-4 border-t border-slate-500">
          <button
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
