import React from 'react';
import { inputStyle, labelAndInputDiv } from './style';
import { ShowPopup } from '../alerts/popUps';

interface FileInputProps {
  label: string;
  accept: string; // Accepts MIME types or file extensions
  maxSizeMB: number;
  register: any; // Adjust based on your form library (e.g., React Hook Form)
  fieldName: string;
  required?: boolean;
  error?: {message:string} | undefined; // Error message from validation
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  accept,
  maxSizeMB,
  register,
  fieldName,
  required = false,
  error,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        ShowPopup("Failed!", `File size exceeds the maximum limit of ${maxSizeMB} MB`, "error", 3000, true);
        
        event.target.value = ''; // Clear the file input
      }
    }
  };

  return (
    <div className="flex flex-col ">
      {label && <label className="font-bold">{label}{required&&<span className="text-red-500 text-lg pl-1">*</span>}</label>}
     
      <input
        type="file"
        accept={accept}
        className={`${inputStyle.data}`}
        onChange={handleFileChange}
        {...register}
      />
      {/* Show validation errors */}
     
      <small className="text-gray-600">Maximum file size: {maxSizeMB} MB</small>
      {error && <p className="text-red-500">{error.message || `${label} required`}</p>}
    </div>
  );
};

export default FileInput;
