import React, { useState, ChangeEvent } from "react";
import { HandleUpload } from "./handleUpload";

interface Props {
  isEditable?: boolean;
}

const ImageUpload: React.FC<Props> = ({ isEditable }) => {
  const [files, setFiles] = useState<File[]>([])
  const [percent, setPercent] = useState<number>(0);
  const [downloadUrls, setDownloadUrls] = useState<string[]>([]);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
    }
  }

  return (
    <div className="w-full flex justify-center flex-col space-y-5 mt-5">
      <h1 className="font-bold text-lg flex mx-auto">Upload Images</h1>
      <input
        disabled={!isEditable}
        type="file"
        className="w-fit py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        onChange={handleChange}
        accept="image/*"
        multiple
      />
      {files.length > 0 && (
        <>
          <button
            type="button"
            className="btn w-fit bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            onClick={() => HandleUpload(files, setFiles, setPercent, setDownloadUrls)}
          >
            Upload
          </button>
          <p>{percent}% done</p>
        </>
      )}
      {downloadUrls.length > 0 && (
        <>
          <p>URLs:</p>
          <div>
            <textarea
              className="w-full border-2 border-black rounded-md h-36 p-2"
              value={downloadUrls.join("\n")}
              readOnly
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
