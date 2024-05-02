"use client"
import Image from "next/image";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import ImageCapture from "@/components/ImageCapture";

export default function Home() {
  return (
    <main className="flex flex-col p-8 items-center">
      <div className="w-[516px]">
        <ImageCapture />
      </div>

    </main>
  );
}
