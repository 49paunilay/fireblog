import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { db } from '../firebase'
import './details.css'
export default function Details() {
    const {id} = useParams()
    const [post,setPost] =useState([])
    const [comment,setComment] = useState('')
    const [res,setRes] =useState(null)
    const getDate = async()=>{
        await db.collection("posts").onSnapshot((snapshot)=>{
            setPost(snapshot.docs.map(doc=>(
                {
                    id:doc.id,
                    post:doc.data()
                }
            )))
        })
        for(let i=0;i<post.length;i++){
            console.log('This');
            if(post[i].id==id){
                console.log('This');
                setRes(post[i])
                break
            }
        }
       // await setRes(result)
    }
    
    useEffect(()=>{
        getDate()
        
    },[])

    return (
        <>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:"15px",textAlign:'center'}}>
            <img alt="Image load failed" style={{width:"500px",height:"500px"}} src="https://th.bing.com/th/id/OIP.juRDDhOC5I1YTOgmxGDtXgHaHa?pid=ImgDet&rs=1"/>
            <h4 style={{color:'blue'}}>Details</h4>
            <h5 style={{margin:"5px",color:'blueviolet',fontWeight:'lighter'}}>
                {res?.post? res.post.caption:"No cap"}
            </h5>
            <h4>Add a Comment</h4>
            <div className="comments">
                <input type="text" placeholder="add a comment" value={comment} onChange={(event)=>setComment(event.target.value)}/>
                <button className="btn blue">Comment</button>
            </div>

        </div>
        <div className="blog_comments">
                <div>
                    <h5>Test comment</h5>
                </div>
            </div>
        </>
    )
}
