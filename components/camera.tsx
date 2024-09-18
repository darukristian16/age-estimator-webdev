import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import Image from "next/image";
import { s } from "framer-motion/client";

export const videoConstraints = {
  width: 720,
  height: 1280,
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

  // Capture image from the webcam
  const CameraWithWatermark = () => (
    <div className="relative">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
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
  )

  const capture = useCallback(() => {
    if (webcamRef.current && webcamRef.current.video) {
      const canvas = document.createElement('canvas');
      canvas.width = webcamRef.current.video.videoWidth;
      canvas.height = webcamRef.current.video.videoHeight;
      const ctx = canvas.getContext('2d');
  
      if (ctx) {
        ctx.drawImage(webcamRef.current.video, 0, 0, canvas.width, canvas.height);
  
        const watermark = new window.Image();
        watermark.onload = () => {
          const watermarkWidth = 300;
          const watermarkHeight = 100;
          ctx.drawImage(watermark, 30, 30, watermarkWidth, watermarkHeight);
          
          const imageSrc = canvas.toDataURL('image/jpeg');
          setImage(imageSrc);
          setIsCaptured(true);
          setIsAgeEstimated(false);
        };
        watermark.src = '/image/logo.png';
      }
    }
  }, [webcamRef]);

  const downloadImage = () => {
    if (image) {
      const link = document.createElement('a');
      link.href = image;
      link.download = 'age-estimation.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };


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
  };
};
