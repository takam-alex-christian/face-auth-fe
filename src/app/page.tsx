"use client"

import { Button, Link } from '@nextui-org/react'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import ImageCapture from "@/components/ImageCapture";

export default function Home() {
  return (
    <main className="flex flex-col p-8 items-center">
      <div className='flex flex-col gap-4'>

        <div className='flex flex-row justify-between p-2'>
          <h1 className='text-2xl font-black'>FacialAuth</h1>
        </div>
        <div className='flex flex-col gap-2'>
          <Button as={Link} href={"/login"} color='primary'>Login using facialAuth</Button>
          <Button as={Link} href={"/signup"}>Signup using facialAuth</Button>
        </div>

      </div>

    </main>
  );
}
