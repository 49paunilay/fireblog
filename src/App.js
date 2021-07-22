import React,{useEffect,useState} from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Navbar from './Components/Navbar';
import Post from './Components/Post';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Details from './Components/Details';
import {auth} from './firebase'
import Upload from './Components/Upload';
function App() {
  const [user,setUser] = useState(null)
  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUser(user)
        console.log(user);
      }else{
        setUser(null)
      }
    })
  },[user])

  return (
    <BrowserRouter>
        <Navbar user={user}/>
        <Switch>
          <Route exact path='/'><Post/></Route>
          <Route exact path='/signup'>
            <SignUp/>
          </Route>
          <Route exact path='/login'>
            <SignIn/>
          </Route>
          <Route path="/details/:id">
            <Details/>
          </Route>
          <Route path="/upload">
            <Upload/>
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
