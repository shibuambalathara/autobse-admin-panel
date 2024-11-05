import React from 'react';
import { inputStyle, labelAndInputDiv, labelStyle } from './style';

interface FileInputProps {
  label: string;
  accept: 'image/*' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  maxSizeMB: number;
  register: any; // Adjust the type based on your form library, e.g., React Hook Form
  fieldName: string;
}

const FileInput: React.FC<FileInputProps> = ({ label, accept, maxSizeMB, register, fieldName }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        alert(`File size exceeds the maximum limit of ${maxSizeMB} MB`);
        event.target.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col">
     
    <label  className={`${labelAndInputDiv.data}`}>{label}</label>
      <input
        type="file"
        accept={accept}
        className={`${inputStyle.data}`}
        onChange={handleFileChange}
        {...register(fieldName)}
      />
      <small className="text-gray-600">Maximum file size: {maxSizeMB} MB</small>
    </div>
  );
};

export default FileInput;
