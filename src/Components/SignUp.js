import React, { useState } from 'react'
import {auth,db} from '../firebase'
import {useHistory} from 'react-router-dom'
export default function SignUp() {
    const [email,setEmail] = useState('')
    const [password,setPasseord] = useState('')
    const [username,setUsername] = useState('')
    const history = useHistory()
    const handleSubmit=async(event)=>{
        event.preventDefault()
        try {
            const result = await auth.createUserWithEmailAndPassword(email,password)
            alert(`Welcome ${result.user.email}`)
            setTimeout(() => {
                history.push('/')
            }, 500);
            
        } catch (error) {
            alert(error.message)
        }
        setEmail('')
        setPasseord('')
        setUsername('')
        
    }
    return (
        <div style={{marginTop:"100px"}}>
            <div style={{textAlign:'center'}}>
                <h5 style={{color:'blue',fontWeight:'bold'}}>Please Signup</h5>
            </div>
            <div style={{padding:"15px"}}>
            <form onSubmit={(e)=>handleSubmit(e)} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}> 
                <input className="taker" type="text" placeholder="Enter the username" value={username} onChange={(e)=>setUsername(e.target.value)}/> 
                <input className="taker" type="email" placeholder="Enter the email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input className="taker" type="password" placeholder="Enter the password" value={password} onChange={(e)=>setPasseord(e.target.value)}/>
                <button className="btn blue" type="submit">Sign Up</button>
            </form>
            </div>
        </div>
    )
}
