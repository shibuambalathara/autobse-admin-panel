// uploadFunctions.js

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import imageCompression from 'browser-image-compression';
import storage from "../firebaseConfig";

export const HandleUpload = async (files, setFiles, setPercent, setDownloadUrls) => {
  if (!files || files.length === 0) {
    alert("Please upload at least one image!");
    return;
  }

  try {
    const options = {
      maxSizeMB: 0.1,
      
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    const compressedFiles = await Promise.all(
      files.map(async (file) => {
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
      })
    );

    const uploadTasks = compressedFiles.map((file) => {
      const storageRef = ref(storage, `/files/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setPercent(percent);
          },
          (err) => {
            console.log(err);
            reject(err);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    });

    Promise.all(uploadTasks)
      .then((urls) => {
        const urlsString = urls.join(', ');
        setDownloadUrls(urlsString);
        setFiles([]); // Clear the selected files after successful upload
        setPercent(0); // Reset the progress bar
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  } catch (error) {
    console.error("Error compressing or uploading images:", error);
  }
};
