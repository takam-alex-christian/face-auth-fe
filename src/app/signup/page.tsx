

"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

import { Button, Chip, Input, Image, Badge, Avatar} from '@nextui-org/react';
import React from 'react'
import Webcam from "react-webcam"

const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: "user"
};

export default function () {

    const [capturedImages, setCapturedImages] = React.useState<Array<string>>([])

    const [username, setUsername] = React.useState<string>("")

    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {

            // @ts-ignore
            const imageSrc = webcamRef.current.getScreenshot({ width: 516, height: 516 });

            setCapturedImages((prevState) => {
                return [...prevState, imageSrc]
            })

        },
        [webcamRef]
    );

    async function onSignupSubmit(e: React.FormEvent) {

        e.preventDefault()

        const reqHeaders = new Headers()
        reqHeaders.append("Content-Type", "application/json")

        fetch("http://localhost:5000/signup", {
            body: JSON.stringify({ username: username, images: capturedImages }),
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
                    <h1 className='text-2x font-semibold'> Fill in the form to signup</h1>
                </div>
                <form className='border-1 border-b-blue-200 p-2 rounded-3xl' onSubmit={onSignupSubmit}>
                    <div className='flex flex-col gap-4'>
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
                                <Button size='lg' isIconOnly onClick={capture} variant='shadow' color='success' endContent={<FontAwesomeIcon icon={faCamera} />}></Button>
                            </div>

                        </div>
                        <div className='flex flex-row gap-2'>
                            <Input className='w-full' type='text' placeholder='Username' value={username} onValueChange={(value) => { setUsername(value) }} />
                            <Button>
                                Submit
                            </Button>
                        </div>
                    </div>

                </form>

                <div className='grid grid-cols-8 gap-1 py-2'>
                    {capturedImages.map((eachImage, index) => {
                        return (
                            <div key={index} className="relative">
                                <Badge content={index + 1} color="primary">
                                    <Avatar
                                        radius="md"
                                        size="lg"
                                        src={`${eachImage}`}
                                        
                                    />
                                </Badge>
                            </div>
                        )
                    })}
                </div>
            </div>

        </main>
    )
}