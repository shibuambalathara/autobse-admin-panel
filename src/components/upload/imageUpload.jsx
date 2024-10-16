import { useState } from "react";


import { HandleUpload } from "./handleUpload";
function ImageUpload() {
  // State to store uploaded files and their download URLs
  const [files, setFiles] = useState([]);
  const [percent, setPercent] = useState(0);
  const [downloadUrls, setDownloadUrls] = useState([]);

  function handleChange(event) {
    const selectedFiles = event.target.files;
    const fileArray = Array.from(selectedFiles);
    setFiles(fileArray);
  }
  return (
    <div className="w-full flex justify-center flex-col space-y-5 ">
      <h1 className="font-bold text-lg flex text-center  ">Choose Images</h1>
      <input
        type="file"
        className="w-fit py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
        onChange={handleChange}
        accept="/image/*"
        multiple 
      />
      {files.length > 0 &&
        <>
                    <button type="button" className="btn w-fit bg-red-500" onClick={() => HandleUpload(files, setFiles, setPercent, setDownloadUrls)}>Upload</button>

          <p>{percent} % done</p>
        </>
      }
      {downloadUrls&&
        <>
          <p>URLs:</p>
         
            <div>
            <textarea
            className="w-full border-2 border-solid border-black h-36 "
            value={downloadUrls}
            readOnly
          ></textarea>
            </div>
        
        </>
      }
    </div>
  );
}

export default ImageUpload;
