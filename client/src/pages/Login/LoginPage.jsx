import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../App.css';

const LoginPage=()=>{
  const navigate=useNavigate();
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [error, setError]=useState('');
    const handleSign=()=>{
        navigate('/signup');
    } 
    
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!email || !password){
            setError('Please fill in all the fields');
            return;
        }
        setError('');
        console.log("Login Attempted with:", {email,password});

    };
    const handleGoogle=()=>{
        console.log("Google signed in clicked!");
    }
    return(
      /* From Uiverse.io by akshat-patel28 */ 
 <div class="form-container">
 <p class="title">Sign in to your account</p>
 <form class="form" onSubmit={handleSubmit}>
   <input type="email" class="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
   <input type="password" class="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
   {/* Error Message */}
{error && (
  <div className="error-message">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="error-icon"
    >
      {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6m12-6a9 9 0 11-18 0 9 9 0 0118 0z" /> */}
    </svg>
    <span>{error}</span>
  </div>
)}

   <p class="page-link">
     <span class="page-link-label">Forgot Password?</span>
   </p>
   <button class="form-btn">Log in</button>
 </form>
 <p class="sign-up-label">
   Don't have an account?<span class="sign-up-link" onClick={handleSign}>Sign up</span>
 </p>
 <div class="buttons-container">
   
   <div class="google-login-button">
     <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" class="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
       <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
       <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
       <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
       <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
     </svg>
     <span onClick={handleGoogle}>Log in with Google</span>
   </div>
 </div>
</div>
    );

}
export default LoginPage;