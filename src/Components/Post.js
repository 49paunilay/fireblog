import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase';
import './post.css'
export default function Post() {
    const [posts,setPosts] = useState([])
    const [comment,setComment] = useState('')
    useEffect(()=>{
        const unsub = db.collection("posts").orderBy('timestamp','desc').onSnapshot((snapshot)=>{
            setPosts(snapshot.docs.map(doc=>(
                {
                    id:doc.id,
                    post:doc.data()
                }
            )
        ))
        });
        return()=>{
            unsub()
        }
    },[])
    return (
        <>
            {
                posts.map(({id,post})=>{
                    return(
                        <div className="card_mycard" key={id}>
                            <div className="post_holder">
                                <img className="post_image" src={post.imageUri}/>
                                <h5>{post.caption}</h5>
                            </div>
                            {/* <div className="chat_holder">
                                <h1>
                                   <input value={comment} onChange={(e)=>setComment(e.target.value)} type="text"/>
                                </h1>
                                <div className="scrollable">
                                    <li>
                                        Comment 1
                                    </li>
                                </div>
                            </div> */}


                        </div> 
                    )
                })
            }
        </>
    )
}
