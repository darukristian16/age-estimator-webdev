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
          {!isCaptured ? (
            <Card className='absolute top-0 left-0 w-full h-full bg-cover'>
              <CameraWithWatermark/>
              <CardFooter className="justify-center overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] ml-1 z-10">
              <div 
                className="cursor-pointer"
                onClick={capture}
              >
                <Image
                  src="/assets/capture-button.png"
                  alt="Capture"
                  width={200}
                  height={200}
                />
              </div>
              </CardFooter>
            </Card>
          ) : (
            <Card 
              className="absolute top-0 left-0 w-full h-full bg-cover"
            >
              <img src={image ?? undefined} alt="Captured" className="w-full h-full object-cover" />

              <div className="flex flex-row items-center justify-center absolute bottom-1 w-[calc(100%_-_8px)] ml-1 z-10">
                <CardFooter 
                  className="flex items-center justify-center overflow-hidden py-1 before:rounded-xl rounded-large w-[calc(100%_-_150px)] h-16 mr-2"
                  style={{
                    backgroundImage: 'url("/assets/age-display.png")',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                >
                  <p className="text-white font-semibold font-arial">
                    Umur Anda: <span className="text-2xl font-helvetica font-bold">{age}</span>
                  </p>
                </CardFooter>
                {!isAgeEstimated && (      
                    <Button 
                      className="text-small text-gray-900 bg-gray-300 font-bold font-helvetica"
                      onClick={predictAge} 
                      variant="flat"  
                      radius="md" 
                      size="lg">
                        Estimate Age
                    </Button>
                )}
                {isAgeEstimated && (
                <div className="flex flex-row gap-2">
                  <div className="cursor-pointer" onClick={retryCapture}>
                    <Image
                      src="/assets/retry-button.png"
                      alt="Retry"
                      width={45}
                      height={45}
                    />
                  </div>
                  <div className="cursor-pointer" onClick={handleDownload}>
                    <Image
                      src="/assets/download-button.png"
                      alt="Download"
                      width={45}
                      height={45}
                    />
                  </div>
                </div>
              )}
              </div>
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