'use client'
import React from "react";
<<<<<<< Updated upstream
import {Card, CardFooter, Button, Spinner} from "@nextui-org/react";
=======
import {Card, CardFooter, Button} from "@nextui-org/react";
>>>>>>> Stashed changes
import {useAgeEstimator} from "@/components/camera"
import Image from "next/image";

export default function App() {
<<<<<<< Updated upstream
  const { webcamRef, image, age, isCaptured, isAgeEstimated, isLoading, capture, predictAge, CameraWithWatermark } = useAgeEstimator();
=======
  const { image, age, isCaptured, isAgeEstimated, capture, retryCapture, predictAge, CameraWithWatermark, downloadImage } = useAgeEstimator();
>>>>>>> Stashed changes

  return (
    <>
      <div className="flex flex-auto flex-row max-h-[calc(100vh*9/16)] flex-wrap gap-4 items-center justify-center">
        <div className="relative">
          {isCaptured && (
            <div className="absolute top-2 right-2 z-20">
              <Button
                isIconOnly
                className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = image;
                  link.download = 'age-estimation.jpg';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                variant="flat"
                color="default"
                radius="full"
                size="sm"
                aria-label="Download image"
              >
                <Image
                  src="/icons/download.png"
                  alt="Download"
                  width={20}
                  height={20}
                  className="invert"
                />
              </Button>
            </div>
          )}
          {!isCaptured ? (
            <Card className='flex w-[calc(100vh*9/16)] max-w-[720px] bg-cover'>
              <CameraWithWatermark/>
              <CardFooter className="justify-between border-black/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <Button 
                  className="text-small text-white bg-red-600 font-semibold font-helvetica"
                  onClick={capture} 
                  variant="flat" 
                  color="default" 
                  radius="lg" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner size="sm" /> : "Capture"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card 
              className="flex w-[calc(100vh*9/16)] max-w-[720px] bg-cover"
              isFooterBlurred
              classNames={{
                footer: "bg-black/60 backdrop-blur-md backdrop-saturate-150"
              }}  
            >
              <img src={image ?? undefined} alt="Captured" className="w-full h-full object-contain" />
              <CardFooter className="justify-between border-black/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] max-h-20 shadow-small ml-1 z-10">
                <p className="text-white font-arial font-bold">Umur Anda: {age}</p>
                {!isAgeEstimated ? (
                  <Button 
                    className="text-small text-white bg-primary font-semibold font-helvetica"
                    onClick={predictAge} 
                    variant="flat" 
                    color="default" 
                    radius="lg" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner size="sm" /> : "Estimate Age"}
                  </Button>
                ) : (
                  <Button
                    className="text-small text-white bg-secondary font-semibold font-helvetica"
                    onClick={() => {
                      webcamRef.current?.video?.play();
                      setIsCaptured(false);
                      setIsAgeEstimated(false);
                    }}
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="lg"
                  >
                    Retry
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
