'use client'
import React from "react";
import Webcam from "react-webcam";
import {Card, CardFooter, Button} from "@nextui-org/react";
import {useAgeEstimator, videoConstraints} from "@/components/camera"

export default function App() {
  const { webcamRef, image, age, isCaptured, isAgeEstimated, capture, retryCapture, predictAge } = useAgeEstimator();

  return (
    <>
      <div className="flex flex-auto flex-row h-[calc(100vh-150px)] flex-wrap gap-4 items-center justify-center">
      {!isCaptured ? (
        <Card className='flex max-w-[720px] bg-cover'>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <CardFooter className="justify-between border-black/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <Button 
            className="text-tiny text-white bg-red-600"
            onClick={capture} 
            variant="flat" 
            color="default" 
            radius="lg" 
            size="sm">
            Capture
          </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card 
          className="max-w-[720px] flex"
          isFooterBlurred
          classNames={{
            footer: "bg-black/60 backdrop-blur-md backdrop-saturate-150"
          }}  
        >
          <img src={image ?? undefined} alt="Captured" className="" />
          <CardFooter className="justify-between border-black/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-white">Estimated Age: {age}</p>
            {!isAgeEstimated ? (
              <Button 
                className="text-tiny text-white bg-red-600"
                onClick={predictAge} 
                variant="flat" 
                color="default" 
                radius="lg" 
                size="sm">
                  Estimate Age
              </Button>
            ) : (
              <Button
                className="text-tiny text-white bg-blue-600"
                onClick={retryCapture}
                variant="flat"
                color="default"
                radius="lg"
                size="lg">
                  Retry
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
      </div>
    </>
  );
}