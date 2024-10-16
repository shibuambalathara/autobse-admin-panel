import { useState } from "react";
import storage from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid'

function ImageUploadDrag() {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [firbaseUrl, setFirbaseUrl] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload an image first!");
    }
    const storageRef = ref(storage, `/files/${file.name + v4()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFirbaseUrl(url);
        });
      }
    );
  };

  return (
    <div className="w-full flex justify-center flex-col space-y-5 mt-10">
      <h1 className="font-bold text-lg flex text-center  ">Drag Image</h1>
      <div
        className="h-44  border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {file ? (
          <img
            className="object-contain h-full w-full"
            src={URL.createObjectURL(file)}
            alt="Selected"
          />
        ) : (
          <span>Drag and drop an image or click to select one.</span>
        )}
      </div>
      {file && (
        <>
          <button className="btn w-fit bg-red-500" onClick={handleUpload}>Upload to Firebase</button>
          <p>{percent} % done</p>
        </>
      )}
      {firbaseUrl && (
        <>
          {/* <img className="w-2/5" src={firbaseUrl} alt="firebase url" /> */}
          <p>URL :</p>
          <textarea className="w-full border-2 border-solid border-black h-36 p-1" value={firbaseUrl}></textarea>
        </>
      )}
    </div>
  );
}

export default ImageUploadDrag;
