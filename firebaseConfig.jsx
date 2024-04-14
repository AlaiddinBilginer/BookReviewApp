// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARou4QL6yQrzZcVNYo2j31zX9VsKLaQF4",
  authDomain: "bookreviewapp-46d2c.firebaseapp.com",
  projectId: "bookreviewapp-46d2c",
  storageBucket: "bookreviewapp-46d2c.appspot.com",
  messagingSenderId: "844865550205",
  appId: "1:844865550205:web:28865e39bfd58713dabe14",
  measurementId: "G-8VWS7GZNQT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);