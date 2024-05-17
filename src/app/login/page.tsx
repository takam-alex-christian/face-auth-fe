"use client"

import {useRouter} from 'next/navigation'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

import { Button, Chip } from '@nextui-org/react';
import React from 'react'
import Webcam from "react-webcam"

import { loginFetch } from '@/libs/utils';

const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: "user"
};

export default function () {

    const [capturedImage, setCapturedImage] = React.useState("");

    const [isAuthed, setIsAuthed] = React.useState<Boolean | null>(null);

    const [authedUser, setAuthedUser] = React.useState({})

    const webcamRef = React.useRef(null);

    

    // const router = useRouter()

    // React.useEffect(()=>{
    //     if (isAuthed) router.push("/app")
    // }, [isAuthed])

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

        await loginFetch(capturedImage).then((output) => {
            console.log(output)

            setIsAuthed(output.authed);

            if(output.authed) setAuthedUser(output)

        })

    }

    return (
        <main className='flex items-center justify-center'>
            <div className='flex flex-col gap-2'>
               { (isAuthed == null || isAuthed == false) && <div className='flex flex-row justify-between p-2'>
                    <div className='flex flex-row gap-2 justify-center'>
                        <h1 className='text-2xl font-black'>FacialAuth</h1>


                        <Chip
                            variant="shadow"

                        >
                            V1.00
                        </Chip>

                    </div>
                    <h1 className='text-2x font-semibold'> Take a photo to login</h1>
                </div>}
                {
                    (isAuthed == null || isAuthed == false) &&              
                    
                    
                <form onSubmit={onLoginSubmit}>

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
                        <div className='flex flex-row gap-2 items-center justify-center absolute w-full bottom-6'>
                            <Button size='lg' onClick={capture} type='button' variant='shadow' color='success' endContent={<FontAwesomeIcon icon={faCamera} />}>capture</Button>
                            <Button type='submit' isDisabled={capturedImage.length == 0}>Login</Button>
                        </div>

                    </div>

                    
                </form>
                }
                {
                    isAuthed && 

                    <div>
                        {/* @ts-ignore */}
                        Welcome back, {authedUser.username}
                    </div>  
                }
            </div>

        </main>
    )
}