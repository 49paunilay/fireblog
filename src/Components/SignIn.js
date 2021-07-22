import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import {auth} from '../firebase'
export default function SignIn() {
    const [email,setEmail] = useState('')
    const [password,setPasseord] = useState('')
    const history = useHistory()
    const handleSubmit=async(event)=>{
        event.preventDefault()
       
        try{
            const result = await auth.signInWithEmailAndPassword(email,password)
            alert('Logged In')
            history.push('/')
        }catch(error){
            alert(error.message)
        }
        
    }
    return (
        <div style={{marginTop:"100px"}}>
            <div style={{textAlign:'center'}}>
                <h5 style={{color:'blue',fontWeight:'bold'}}>Please Login</h5>
            </div>
            <div style={{padding:"15px"}}>
            <form onSubmit={(e)=>handleSubmit(e)} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>  
                <input className="taker" type="email" placeholder="Enter the email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input className="taker" type="password" placeholder="Enter the password" value={password} onChange={(e)=>setPasseord(e.target.value)}/>
                <button className="btn blue" type="submit">Sign In</button>
            </form>
            </div>
        </div>
    )
}
