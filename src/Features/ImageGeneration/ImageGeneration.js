import React, { useEffect, useRef, useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import { apiKey } from './Constants'
import "./ImageGeneration.css"

function ImageGeneration() {

    const openAiApi = useRef()
    const inputRef = useRef()
    const [imageUrl, setImageUrl] = useState()
    const [message, setMessage] = useState()


    useEffect(()=>{
        createApiInterface()
    },[])

    function createApiInterface(){
        // Create a configuration instance
        const configuration = new Configuration({apiKey: apiKey})
        // Create an api instance
        openAiApi.current = new OpenAIApi(configuration)
    }

    async function generateImage(){
        const prompt = inputRef.current.value
        
        setMessage("Generating image with prompt: "+prompt)
        if(!openAiApi.current){
            console.log("no openAiApi instance has been created")
            return
        }
        const response = await openAiApi.current.createImage({
            prompt,
            n: 1,
            size: "512x512"
        })
        setImageUrl(response.data.data[0].url)
    }

  return (
    <div className='imageGenerationWindow'>
        <textarea ref={inputRef} placeholder="Image Generation Prompt"></textarea>
        <div>{message}</div>
        <div>
            <button onClick={generateImage}>Generate</button>
        </div>
        <div>
            <img src={imageUrl}></img>
        </div>
    </div>
  )
}

export default ImageGeneration