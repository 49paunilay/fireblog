import React from 'react';
import {Link} from 'react-router-dom'
import {auth} from '../firebase'
import {useHistory} from 'react-router-dom'
const Navbar = ({user}) => {
  const history = useHistory()
  const handleSignout=()=>{
    console.log("buttonClicked");
    auth.signOut()
    history.push('/')

  }
  const fileUpload=()=>{
    history.push('/upload')
  }
    return (
      <>
        <nav>
          <div className="nav-wrapper blue">
           <Link to="/" className="brand-logo" style={{marginRight:"15px"}}>Blog</Link>
            <ul id="nav-mobile" className="right">
              
            {user?(<ul><li><button className="btn blue" onClick={handleSignout}>Logout</button></li><li><button style={{marginLeft:"5px"}} onClick={fileUpload} className="btn blue">Upload</button></li></ul>):
            <>
              <li><Link to="/signup" >SignUp</Link></li>
              <li><Link to='/login'>Log In</Link></li>
              </>
            }
            </ul>
          </div>
        </nav>
      </>
    );
}

export default Navbar;
