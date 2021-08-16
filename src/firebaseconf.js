import firebase from "firebase";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAVtcTEf4xmAIk3uGpiRq17nhP0vBPRKKY",
    authDomain: "dalton-insurance.firebaseapp.com",
    projectId: "dalton-insurance",
    storageBucket: "dalton-insurance.appspot.com",
    messagingSenderId: "816475192226",
    appId: "1:816475192226:web:0f90bc34cd02572607d0fb"
};
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth()
const store = fire.firestore()

export {auth}
export {store}