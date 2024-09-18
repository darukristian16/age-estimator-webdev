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
        <Card className='flex w-[calc(100vh*9/16)] max-w-[720px] bg-cover'>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="object-cover"
          />
          <CardFooter className="justify-between border-black/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <Button 
            className="text-small text-white bg-red-600 font-semibold font-helvetica"
            onClick={capture} 
            variant="flat" 
            color="default" 
            radius="lg" 
            size="lg">
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
          <CardFooter className="justify-between border-black/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] max-h-20 shadow-small ml-1 z-10">
            <p className="text-white font-arial font-bold">Umur Anda: {age}</p>
            {!isAgeEstimated ? (
              <Button 
                className="text-small text-white bg-primary font-semibold font-helvetica"
                onClick={predictAge} 
                variant="flat" 
                color="default" 
                radius="lg" 
                size="lg">
                  Estimate Age
              </Button>
            ) : (
              <Button
                className="text-small text-white bg-secondary font-semibold font-helvetica"
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