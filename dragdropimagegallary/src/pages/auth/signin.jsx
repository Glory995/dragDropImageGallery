import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../Authentication.css"

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
  const [signerr, setSignerr] = useState(null);
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted
    if (isSignUp) {
      // Handle sign-up logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          setIsLoading(false); // Set loading to false on success
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false); // Set loading to false on error
        });
    } else {
      // Handle sign-in logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          Navigate("/welcome");
          setIsLoading(false); // Set loading to false on success
        })
        .catch((error) => {
          console.log(error);
          setSignerr(true);
          setIsLoading(false); // Set loading to false on error
        });
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="authentication-container">
      <h1>{isSignUp ? "Create Account" : "Log In to your Account"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : isSignUp ? "Sign Up" : "Log In"}
        </button>
        {signerr && (
          <div>
            <p className="red">Confirm if email or password is correct</p>
          </div>
        )}
      </form>
      <p onClick={toggleMode}>
        {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default Authentication;
