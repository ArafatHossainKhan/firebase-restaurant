import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDG-xZA0Jk7iyBHbQ_M9oH1BL0J0tC8C00",
    authDomain: "restaurantapp-9e349.firebaseapp.com",
    databaseURL: "https://restaurantapp-9e349-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-9e349",
    storageBucket: "restaurantapp-9e349.appspot.com",
    messagingSenderId: "345494999730",
    appId: "1:345494999730:web:a3745959b87417606f2fab"
  };


  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app)
  const storage = getStorage(app)

  export { app, firestore, storage };
