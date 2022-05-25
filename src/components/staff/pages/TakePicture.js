import React from 'react'
import camera from './camera.js'
import { CameraFeed } from './camera-feed';
function TakePicture() {
    // Upload to local seaweedFS instance
const uploadImage = async file => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(file, formData)

    const objectURL = URL.createObjectURL(file)
    console.log(objectURL)

    // Connect to a seaweedfs instance
};

const blobToImage = (blob) => {
    return new Promise(resolve => {
      const url = URL.createObjectURL(blob)
      let img = new Image()
      img.onload = () => {
        URL.revokeObjectURL(url)
        resolve(img)
      }
      img.src = url
      console.log(url)
    })
  }
    return (
        <div>
            <h1>Image capture test</h1>
            <p>Capture image from USB webcamera and upload to form</p>
            <CameraFeed sendFile={uploadImage} />
            <button onClick={(evt)=>camera.startCamera()}>
                Open Camera
            </button>
            <button onClick={(evt)=>camera.takeSnapshot()}>
                Click
            </button> 
           
        </div>
    )
}

export default TakePicture
