import React, { useEffect, useRef, useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import { apiKey } from './Constants'
import "./ImageGeneration.css"

function ImageGeneration() {

    const openAiApi = useRef()
    const inputRef = useRef()
    const [imageUrl, setImageUrl] = useState()
    const [message, setMessage] = useState()

    // how to I use something like what is in this request
    // https://beta.openai.com/docs/guides/moderation/quickstart
    // Prolly axios.get()

    useEffect(()=>{
        createApiInterface()
    },[])

    function createApiInterface(){
        // Create a configuration instance
        const configuration = new Configuration({apiKey: apiKey})
        // Create an api instance
        openAiApi.current = new OpenAIApi(configuration)
    }

    async function checkText(_text){
        return false
    }

    async function generateImage(){

        // Get the prompt value
        const prompt = inputRef.current.value
        
        // Make sure there is an instance of the api
        if(!openAiApi.current){
            console.log("no openAiApi instance has been created")
            return
        }

        // Make sure the text is in line with the api content policy
        if(await  checkText == true){
            setMessage("Prompt was flagged as against content policy. Input prompt: "+prompt)
            return
        }

        // Diaplay a user image
        setMessage("Generating image with prompt: "+prompt)

        // Generate the image and get a response
        const response = await openAiApi.current.createImage({
            prompt,
            n: 1,
            size: "512x512"
        })

        // Retrieve the url from the resonse to be displayed
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