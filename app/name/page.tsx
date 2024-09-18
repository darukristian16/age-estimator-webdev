'use client'
import React from "react";
import {Input} from "@nextui-org/react";
import {Link} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import { useRouter } from 'next/navigation'
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function App() {
  const variants = ["bordered"];
  const router = useRouter();
  return (
    <div className="flex flex-col w-full max-w-full h-[calc(100vh-150px)] items-center justify-center py-80 gap-4 mx-auto">
        <div className="flex items-center gap-4">
            {variants.map((variant) => (
                <div key={variant} className="w-72">
                    <Input 
                        type="name" 
                        variant="bordered" 
                        label="Name"
                        placeholder="Enter your name" 
                    />
                </div>
                ))}
                <div>
                    <Button 
                        as={Link}
                        href='#'
                        size="lg"
                        radius="full" 
                        color="primary"
                        variant="shadow"
                        onClick={() => router.replace('/?page=start')}
                        className="font-helvetica font-semibold" 
                    >
                        Proceed
                    </Button>
                </div>
        </div>
            <Accordion variant='light' className="w-72 mt-2 text-sm">
                <AccordionItem 
                    key="1" 
                    aria-label="User Agreement" 
                    title="User Agreement"
                    classNames={{
                        title: "text-sm font-normal",
                        content: "text-xs"
                    }
                    }
                    >
                        By providing your name and proceeding, you agree that your name and image will be used for the age estimation process. We ensure your data is handled securely and confidentially.

                </AccordionItem>
            </Accordion>  
    </div>
    
  );
}