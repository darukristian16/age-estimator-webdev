'use client'
import {Link} from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/button";
import { title, subtitle } from "@/components/primitives";
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()
  return (
    <section className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-150px)] mx-auto">
      <div className="inline-block max-w-2xl text-center justify-center">
        <h1 className={title()}>
          Welcome to&nbsp;
        </h1>
        <h1 className={title({color:"red"})}>
          Age Estimator
        </h1>
      </div>
      <div>
        <Button 
          as={Link}
          href='#'
          size="lg"
          radius="full"
          color="primary"
          variant="shadow" 
          onClick={() => router.replace('/?page=name')}
          className="font-helvetica font-semibold" 
        >
            Get Started
        </Button>
      </div>
    </section>
  );
}
