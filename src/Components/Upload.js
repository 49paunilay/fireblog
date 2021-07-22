import React, { useState } from 'react'
import './upload.css'
import { db,storage } from '../firebase'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'
export default function Upload() {
    const [content,setContent] = useState('')
    const [image,setImage] = useState(null)
    const [progress,setProgress] = useState(0)
    const history = useHistory()
    const uploadPost=()=>{
        const Uploadtask = storage().ref(`images/${image.name}`).put(image)
        Uploadtask.on(
            "state_changed",
            (snapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
                setProgress(progress)
            },
            (error)=>{
                console.log(error);
                alert(error.message)
            },
            ()=>{
                storage().ref("images").child(image.name).getDownloadURL().then(url=>{
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:content,
                        imageUri:url
                    })
                    setContent('')
                    setImage(null)
                    setProgress(0)
                })
            }
        )
        history.push('/')
    }
    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }
    return (
        <>
        <div className="upload-div">
            <button className="upload_button"><input type="file" accept="image/*" onChange={handleChange} placeholder="Enter file"/></button>
            <progress value={progress} max="100"/>
            <input value={content} onChange={(e)=>setContent(e.target.value)} className="text-holder" type="text" placeholder="Enter the thought"/>
            <button className="upload" onClick={uploadPost}>Upload</button>
        </div>
        </>
    )
}
