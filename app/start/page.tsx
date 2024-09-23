'use client'
import React , { useEffect, useState } from "react";
import {Card, CardFooter, Button} from "@nextui-org/react";
import {useAgeEstimator} from "@/components/camera"
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { QRCodeSVG } from "qrcode.react";

export default function App() {
  const { image, age, isCaptured, isAgeEstimated, capture, retryCapture, predictAge, CameraWithWatermark, downloadImage, imgurUrl } = useAgeEstimator();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");

  useEffect(() => {
    const nameParam = searchParams.get('name');
    if (nameParam) {
      setName(decodeURIComponent(nameParam));
    }
  }, [searchParams]); 

  const handleDownload = () => {
    downloadImage(name);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center min-h-[calc(100vh-150px)] p-4">
        <div className="relative w-full max-w-[50vh] aspect-[9/16]">
          {isCaptured && (
            <div className="absolute top-4 right-4 z-20">
              <Button
                isIconOnly
                className="bg-green-500 hover:bg-green-600 shadow-lg"
                onClick={handleDownload}
                variant="flat"
                color="default"
                radius="lg"
                size="lg"
                aria-label="Download image"
                isDisabled={!isAgeEstimated}
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
            <Card className='absolute top-0 left-0 w-full h-full bg-cover'>
              <CameraWithWatermark/>
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
              className="absolute top-0 left-0 w-full h-full bg-cover"
              isFooterBlurred
              classNames={{
                footer: "bg-black/60 backdrop-blur-md backdrop-saturate-150"
              }}  
            >
              <img src={image ?? undefined} alt="Captured" className="w-full h-full object-cover" />
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
        {isAgeEstimated && imgurUrl && (
          <div className="ml-4 w-72 bg-gradient-to-br from-red-600 to-orange-500 p-6 rounded-xl shadow-lg flex flex-col items-center">
          <div className="bg-white p-3 rounded-lg shadow-inner">
            <QRCodeSVG 
              value={imgurUrl} 
              size={200} 
            />
          </div>
          <p className="mt-4 text-center text-lg font-bold text-white">
            Capture the Moment!
          </p>
          <p className="mt-2 text-center text-sm text-white">
            Scan the QR code to download your age-estimated picture
          </p>
        </div>
        )}
      </div>
    </>
  );
}