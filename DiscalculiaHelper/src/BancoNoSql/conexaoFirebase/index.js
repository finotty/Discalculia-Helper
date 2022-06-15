import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAz4QxxGSuvwunBx8JgFxZWzFjvMlC5Oko",
    authDomain: "discalculiahelper.firebaseapp.com",
    databaseURL: "https://discalculiahelper-default-rtdb.firebaseio.com",
    projectId: "discalculiahelper",
    storageBucket: "discalculiahelper.appspot.com",
    messagingSenderId: "841276208621",
    appId: "1:841276208621:web:4f622ba6eb4413ebaaa3e4",
    measurementId: "G-979X2T0PBT"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export const db = getDatabase(app);
  