// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7muZHkfNjsRVox9ZbHyY1UQ4tvfhqGDk",
  authDomain: "mobilecrossweek11.firebaseapp.com",
  projectId: "mobilecrossweek11",
  storageBucket: "mobilecrossweek11.appspot.com",
  messagingSenderId: "1061070918597",
  appId: "1:1061070918597:web:cd092debf8e80f40f8b1ac",
  measurementId: "G-Y1BYB909VS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);