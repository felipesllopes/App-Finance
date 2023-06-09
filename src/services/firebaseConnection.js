import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBRm34Lugi9brqkBEQKva1uy0AcSUC8vM4",
    authDomain: "finance-59308.firebaseapp.com",
    projectId: "finance-59308",
    storageBucket: "finance-59308.appspot.com",
    messagingSenderId: "530948860061",
    appId: "1:530948860061:web:38e4ad5a50bbf59d8b8c74"
};

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export default firebase;