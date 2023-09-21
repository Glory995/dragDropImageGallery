
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration, replace it with your project keys
const firebaseConfig = {
  apiKey:  "AIzaSyCpdt7PMLSRTLkPuYdbI9DOrja803dhrKo",
  authDomain: "imagegallery-2a32d.firebaseapp.com",
  projectId:"imagegallery-2a32d",
  storageBucket: "imagegallery-2a32d.appspot.com",
  messagingSenderId: "475551622058",
  appId: "1:475551622058:web:0ed9748eaa58556b8e41d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);