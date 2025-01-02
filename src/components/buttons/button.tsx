import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  FaTimes } from "react-icons/fa";

export const CloseButton = () => {
    return (
      <button
        onClick={() => window.close()}
        className="flex items-center gap-2 text-gray-700 hover:text-red-600 bg-gray-200 hover:bg-gray-300 border rounded-full px-3 py-2"
      >
        <FaTimes className="text-lg" />
      </button>
    );
  };
  
  interface EditButtonProps {
    handleEdit: () => void;
    isEditable: boolean;
  }
  
  export const EditButton: React.FC<EditButtonProps> = ({ handleEdit, isEditable }) => {
    return (
      <div>
        <button
          onClick={handleEdit}
          className={`flex items-center px-4 py-2 text-white rounded-md ml-5 transition-colors duration-300 ${
            isEditable ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <FontAwesomeIcon icon={isEditable ? faEye : faEdit} />
        </button>
      </div>
    );
  };
  