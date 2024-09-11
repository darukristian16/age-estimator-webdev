'use client'
import React from "react";
import {Input} from "@nextui-org/react";
import {Link} from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/button";
import { useRouter } from 'next/navigation'

export default function App() {
  const variants = ["bordered"];
  const router = useRouter();
  return (
    <div className="flex w-full max-w-full h-full items-center justify-center py-80 gap-4 mx-auto">
        {variants.map((variant) => (
        <div key={variant} className="w-72">
            <Input 
                type="name" 
                variant="bordered" 
                label="Name"
                placeholder="Enter your name" />
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
            >
                Proceed
            </Button>
        </div>  
    </div>
  );
}