import watermark from "watermarkjs"

export const applyWatermark = (file, convertToBlob, rotationAngle = 0, opacity = 0.5) => {

    if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
      throw new Error('Only jpeg and png formats allowed!');
  }

    watermark([file]).image((img) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;
  
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
      const text = 'AUTOBSE.COM';
      const fontSize = 48;
      const fontFamily = 'sans-serif';
      const textColor = 'rgba(0, 0, 0, ' + opacity + ')'; // Set opacity for text color

      ctx.translate(canvas.width / 2, canvas.height / 2);
      myRadRotateFunction(rotationAngle)(ctx); // Use the provided rotation function
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 0, 0);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      return canvas;

    }).then((img) => {
      convertToBlob(img.src);
    });
  };
  
  // Helper function for rotation
  function myRadRotateFunction(alpha) {
    return function (target) {
      target.rotate((alpha * Math.PI) / 180);
    };
  }


    