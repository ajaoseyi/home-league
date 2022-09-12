
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCy-eJipA5NQuTpYOmLqKpqHMdp271F5As",
    authDomain: "our-league-b3978.firebaseapp.com",
    databaseURL: "https://our-league-b3978-default-rtdb.firebaseio.com",
    projectId: "our-league-b3978",
    storageBucket: "our-league-b3978.appspot.com",
    messagingSenderId: "1037598155179",
    appId: "1:1037598155179:web:6e32a482af6022956132ee",
    measurementId: "G-76BRBFMF7J"
  };
  firebase.initializeApp(firebaseConfig);

export default firebase;