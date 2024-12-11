import { FaEdit, FaUpload } from "react-icons/fa";
interface ImageProps{
    label:string;
    preview:string;
    onEditClick: () => void;
    onUploadClick: () => void;
    disabled:boolean;
}   
export const ImageUploadField :React.FC<ImageProps>= ({ label, preview, onEditClick, onUploadClick,disabled=false }) => (
    <div className="flex flex-col items-center h-72 w-88 relative group">
      <label className="text-gray-700 text-sm font-bold mb-2">{label}</label>
      {preview ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={preview}
            alt={`${label} preview`}
            className="object-cover w-full h-64 mt-2 rounded-lg"
          />
          {!disabled&&
          <button
          type="button"
          className="absolute inset-0 h-64 mt-2 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
          onClick={onEditClick}
        >
          <FaEdit className="text-2xl" />
        </button>}
          
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-64 mt-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
          
          {!disabled&&<button
            type="button"
            className="flex items-center justify-center text-gray-500"
            onClick={onUploadClick}
          >
            <FaUpload className="text-2xl" />
          </button>}
        </div>
      )}
    </div>
  );
  