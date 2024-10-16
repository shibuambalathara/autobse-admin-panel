import imageCompression from 'browser-image-compression';

export const fileCompress = async (file) => {

    const options = {
        maxSizeMB: 0.9,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try{
        const compressedFile = await imageCompression(file, options);
        console.log(compressedFile, 'compress file');
        return compressedFile;
      } catch (error) {
        alert('Failed to compress!')
      }

}