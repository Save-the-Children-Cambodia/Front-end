import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import '../assets/css/login.css'; // Import CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result) {
        console.log("User Logged in");
        window.location.href = "/admin";
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleLoginWithEmail = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result) {
        window.location.href = "/admin";
      }
    } catch (error) {
      console.error('Error signing in with email and password:', error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
      // Redirect user to a page indicating that password reset email has been sent
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='input-field'
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='input-field'
      />
      <button onClick={handleLoginWithEmail} className='login-button'>
        Sign in
      </button>
      <button onClick={handleGoogle} className='login-button google'>
        Sign in with Google
      </button>
      <button onClick={() =>window.location.href=' /form'} className='login-button'>
        Sign-up
      </button>
      <a href="#" onClick={handleForgotPassword} className='forgot-password'>
        Forgot Password?
      </a>
    </div>
  );
}

export default Login;
