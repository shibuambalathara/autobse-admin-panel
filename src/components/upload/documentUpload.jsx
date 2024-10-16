import { useState } from 'react'
import storage from '../firebaseConfig';
import { v4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL, updateMetadata } from "firebase/storage";
import { inputStyle } from '../utils/style'
import { applyWatermark } from '../../utils/waterMark';
import { fileCompress } from './fileCompress';


export const DocumentUpload = ({ label, setState }) => {

  // console.log(label, 'label');
  // console.log(setState, 'setstate');
  const [watermarkImgUrl, setWatermarkImgUrl] = useState("")

  const HandleUpload = async (event) => {
    // console.log("event", event);
    let file = event.target.files[0];
    // console.log("file", file);
    if (!file) {
      alert("Please upload a file first!");
      return;
    }
    
    //compress file
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      file = await fileCompress(file)
    }

    const uploadToFirebaseStorage = (file) => {

      // Generate a unique identifier for the file
      const fileId = v4();

      // Use the generated identifier as part of the storage path
      const storagePath = `/files/${fileId}_${file.name}`;
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // setPercent(percent);
        },
        (err) => console.log(err),
        async () => {
          try {

            // Update metadata to specify content type
            const metadata = {
              contentDisposition: 'attachment',
              contentType: file.type,
            };
            await updateMetadata(storageRef, metadata);

            // Get the download URL
            const url = await getDownloadURL(storageRef);

            // Update the state with the download URL
            console.log("url", url);
            setState(url);
          } catch (error) {
            alert(error);
            console.error("Error updating metadata or getting download URL:", error);
          }
        }
      );
    }

    const convertToBlob = (img) => {

      // set state to display the watermark image in ui before converting to blob and uploading to firebase
      setWatermarkImgUrl(img);

      // Remove the "data:image/png;base64," prefix
      const base64Data = img.replace(/^data:image\/\w+;base64,/, '');

      // Convert the Base64 data to a Uint8Array
      const binaryData = Uint8Array.from(window.atob(base64Data), (char) => char.charCodeAt(0));

      // Create a Blob from the Uint8Array
      const blob = new Blob([binaryData], { type: 'image/png' });

      // The three steps are done inorder to convert the base64 png format into blob
      uploadToFirebaseStorage(blob);
    }

    if (label === 'Auction Notice') {
      try {
        applyWatermark(file, convertToBlob, -45, 0.5)

      } catch (error) {
        // alert(error)
        uploadToFirebaseStorage(file); // if file is other than jpeg and png directly upload to firebase
      }
    } else {
      // Tender Document
      uploadToFirebaseStorage(file);
    }

  };




  return (
    <div>
      <label>{label}</label>
      <input
        type="file"
        className={`${inputStyle.data}`}
        onChange={HandleUpload}
        accept="/image/*"
        multiple
      />

      {/* Display watermarked image . !Note: this img is taken just after applying watermark and before uploading to firebase */}

      with waterMark
      <img src={watermarkImgUrl} alt="" />

    </div>
  )
}

