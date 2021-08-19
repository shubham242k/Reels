import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA8c5UTRh8W1y7-phJBqdEU4LNJeuGpF-A",
  authDomain: "reels-32b5d.firebaseapp.com",
  projectId: "reels-32b5d",
  storageBucket: "reels-32b5d.appspot.com",
  messagingSenderId: "384788258460",
  appId: "1:384788258460:web:5bc8d49996504a85709759"
};

firebase.initializeApp(firebaseConfig);

let provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();

export const signInWithGoogle = () =>{
  auth.signInWithPopup(provider);
}


export const firestore = firebase.firestore();
export default firebase;