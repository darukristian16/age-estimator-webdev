import { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export const videoConstraints = {
  width: 1280,
  height: 720,
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

  // Capture image from the webcam
  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
    }
  };

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
    } catch (error) {
      console.error("Error estimating age", error);
    }
  };

  return {
    webcamRef,
    image,
    age,
    capture,
    predictAge,
  };
};
