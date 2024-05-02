"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

import { Button, Chip } from '@nextui-org/react';
import React from 'react'
import Webcam from "react-webcam"

const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: "user"
};

export default function () {

    const [capturedImage, setCapturedImage] = React.useState("")

    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {

            // @ts-ignore
            const imageSrc = webcamRef.current.getScreenshot({ width: 516, height: 516 });

            setCapturedImage(imageSrc)
        },
        [webcamRef]
    );

    async function onLoginSubmit(e: React.FormEvent) {

        e.preventDefault()

        const reqHeaders = new Headers()
        reqHeaders.append("Content-Type", "application/json")

        fetch("http://localhost:5000/login", {
            body: JSON.stringify({ image: capturedImage }),
            headers: reqHeaders,
            method: "POST"
        }).then(res => res.json()).then((jsonResponse) => {
            console.log(jsonResponse)
        })


    }

    return (
        <main className='flex items-center justify-center'>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-row justify-between p-2'>
                    <div className='flex flex-row gap-2 justify-center'>
                        <h1 className='text-2xl font-black'>FacialAuth</h1>


                        <Chip
                            variant="shadow"

                        >
                            V1.00
                        </Chip>

                    </div>
                    <h1 className='text-2x font-semibold'> Take a photo to login</h1>
                </div>

                <form>
                    <div className='relative flex flex-col'>
                        <Webcam
                            className="block rounded-2xl"
                            audio={false}
                            height={516}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"

                            width={516}
                            videoConstraints={videoConstraints}
                        />
                        <div className='flex flex-row justify-center absolute w-full bottom-2'>
                            <Button size='lg' onClick={onLoginSubmit} variant='shadow' color='success' endContent={<FontAwesomeIcon icon={faCamera} />}>capture</Button>
                        </div>

                    </div>


                </form>
            </div>

        </main>
    )
}