"use client"

import React from "react";
import Webcam from "react-webcam"

const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: "user"
};

export default () => {

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

    async function onSignupSubmit(e: React.FormEvent){

        e.preventDefault()

        const reqHeaders = new Headers()
        reqHeaders.append("Content-Type","application/json")

        fetch("http://localhost:5000/signup", {
            body: JSON.stringify({username: username, images: capturedImages}),
            headers: reqHeaders,
            method: "POST"
        }).then(res => res.json()).then((jsonResponse)=>{
            console.log(jsonResponse)
        })
        
        
    }  

    return (
        <div className="">
            <form onSubmit={onSignupSubmit}>
                <div>
                    <Webcam
                        className="block rounded-2xl"
                        audio={false}
                        height={516}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"

                        width={516}
                        videoConstraints={videoConstraints}
                    />
                    <label>username: <input value={username} onChange={(e)=>{setUsername(e.target.value)}}></input></label>
                    <button onClick={capture} type="button">Capture photo</button>
                    
                    <button type="submit">Signup</button>
                </div>
                <div className="flex flex-row gap-x-2 gap-y-2 flex-wrap  max-w-[516px]">
                    {capturedImages.map((eachImage, index) => {
                        return (
                            <div key={index} className="relative">
                                <div className="right-1 top-1 flex items-center justify-center absolute bg-blue-600 text-white text-sm w-6 h-6 rounded-full">{index + 1}</div>
                                <img key={index} src={`${eachImage}`} className="rounded-md" width={96} height={96} />
                            </div>
                        )
                    })}
                </div>

            </form>
        </div>
    )
}