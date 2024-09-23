import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import Image from "next/image";

export const videoConstraints = {
  width: { ideal: 1080 },
  height: { ideal:1920 },
  aspectRatio: 9/16,
  facingMode: "user",
};

// Function to convert base64 image to Blob
export const base64ToBlob = (base64String: string) => {
  const byteString = atob(base64String.split(",")[1]);
  const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];

  const buffer = new ArrayBuffer(byteString.length);
  const uintArray = new Uint8Array(buffer);

  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([buffer], { type: mimeString });
};

// Custom hook for age estimation logic
export const useAgeEstimator = () => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [isAgeEstimated, setIsAgeEstimated] = useState(false);
  const [imgurUrl, setImgurUrl] = useState<string | null>(null);

  const[qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  // const dummyUrl = "https://example.com/dummy-image";

  const uploadToImgur = async (imageBase64: string) => {
    const clientId = '0bb48e667fe9fb0';
    const base64Image = imageBase64.split(',')[1];

    try {
      const response = await axios.post('https://api.imgur.com/3/image', {
        image: base64Image,
        type: 'base64'
      }, {
        headers: {
          'Authorization': `Client-ID ${clientId}`
        }
      });
      if (response.data.data.link) {
        setImgurUrl(response.data.data.link);
        return response.data.data.link;
      }
    } catch (error) {
      console.error('Error uploading to Imgur:', error);
      return null;
    }
  };

  const generateQRCode = async () => {
    if (image) {
      const uploadedUrl = await uploadToImgur(image);
      if (uploadedUrl) {
        console.log('Imgur URL:', uploadedUrl);
        setQrCodeUrl(uploadedUrl);
      } else {
        console.error('Failed to get Imgur URL');
        setQrCodeUrl(null);
      }
    }
  };


  // Capture image from the webcam
  const CameraWithWatermark = () => (
    <div className="relative w-full h-full pb-[177.78%]">
  <   div className="absolute top-0 left-0 w-full h-full">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="absolute top-0 left-0 w-full h-full object-cover transform scale-x-[-1]"
            onUserMediaError={(err) => console.error('Webcam error:', err)}
          />
          <div className="absolute top-4 left-4 opacity-80">
            <Image
              src="/image/logo.png"
              alt="Watermark"
              width={200}
              height={100}
            />
          </div>
      </div>
    </div> 
  )

  const capture = useCallback(async () => {
    if (webcamRef.current && webcamRef.current.video) {
      const video = webcamRef.current.video;
      const aspectRatio = 9 / 16;
      
      let targetWidth, targetHeight;
      if (video.videoWidth / video.videoHeight > aspectRatio) {
        targetHeight = video.videoHeight;
        targetWidth = targetHeight * aspectRatio;
      } else {
        targetWidth = video.videoWidth;
        targetHeight = targetWidth / aspectRatio;
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Draw the video frame
        const sx = (video.videoWidth - targetWidth) / 2;
        const sy = (video.videoHeight - targetHeight) / 2;
        ctx.drawImage(video, sx, sy, targetWidth, targetHeight, 0, 0, targetWidth, targetHeight);

        // Flip the image horizontally
        ctx.scale(-1, 1);
        ctx.drawImage(canvas, -targetWidth, 0, targetWidth, targetHeight);
        ctx.scale(-1, 1); // Reset the scale

        // Draw the watermark
        const watermark = new window.Image();
        watermark.onload = async() => {
          const watermarkWidth = targetWidth * 0.45;
          const watermarkHeight = (watermarkWidth / 3) * 1;

          const xPosition = targetWidth * 0.04;
          const yPosition = targetHeight * 0.02;

          ctx.drawImage(watermark, xPosition, yPosition, watermarkWidth, watermarkHeight);
          
          const imageSrc = canvas.toDataURL('image/jpeg');
          setImage(imageSrc);
          setIsCaptured(true);
          setIsAgeEstimated(false);
          await generateQRCode();
        };
        watermark.src = '/image/logo.png';
      }
    }
  }, [webcamRef, generateQRCode]);

  const downloadImage = useCallback((name: string) => {
  if (image && age !== null) {
    const canvas = document.createElement('canvas');
    const img = new window.Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        
        // Add age text to the image
        ctx.font = 'bold 30px Arial';
        const text = `Umur Anda: ${age}`;
        const textMetrics = ctx.measureText(text);
        const textWidth = textMetrics.width;
        const textHeight = 30; // Approximate height of the text

        const x = canvas.width / 2;
        const y = canvas.height - 20;
        
        // Add a semi-transparent background that fits the text
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x - textWidth / 2 - 10, y - textHeight - 10, textWidth + 20, textHeight + 20);
        
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(text, x, y);

        // Create download link
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = `age-estimation-${name}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    img.src = image;
  }
}, [image, age]);

  const retryCapture = () => {
    setImage(null);
    setAge(null);
    setIsCaptured(false);
    setIsAgeEstimated(false);
  }

  // Predict age by sending the image to the API
  const predictAge = async () => {
    if (!image) return;

    try {
      const blob = base64ToBlob(image);
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");

      const response = await axios.post(
        "https://telkom-ai-dag.api.apilogy.id/Age_Estimator_CPU/0.0.1/v1",
        formData,
        {
          headers: {
            "x-api-key": "adDwfx485WAOwGeaiVcRu4at5nyFvHp4",
            accept: "application/json",
          },
        }
      );

      console.log(response); // Inspect the response

      const predictedAge = response.data.data[0]?.age; // Extract age from response
      setAge(predictedAge); // Set age state
      setIsAgeEstimated(true);
      await generateQRCode();
    } catch (error) {
      console.error("Error estimating age", error);
    }
  };

  return {
    webcamRef,
    image,
    age,
    isCaptured,
    isAgeEstimated,
    capture,
    retryCapture,
    predictAge,
    CameraWithWatermark,
    downloadImage,
    qrCodeUrl,
    imgurUrl,
    generateQRCode,
  };
};
