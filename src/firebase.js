import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const config = {
    apiKey: "AIzaSyDGebs97E5AEACEoJrZKkjpfs5fgVIlgTs",
    authDomain: "chat-8a0b3.firebaseapp.com",
    databaseURL: "https://chat-8a0b3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-8a0b3",
    storageBucket: "chat-8a0b3.appspot.com",
    messagingSenderId: "141221624342",
    appId: "1:141221624342:web:3bbac73fd29b7be43c1337"
  };

  const app = initializeApp(config);
  export const db = getFirestore(app);