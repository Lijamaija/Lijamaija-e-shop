import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAmC6qudW0qreJMvxX8_LK7MEIzzvHSafA",
    authDomain: "crwn-db-5bad6.firebaseapp.com",
    databaseURL: "https://crwn-db-5bad6.firebaseio.com",
    projectId: "crwn-db-5bad6",
    storageBucket: "crwn-db-5bad6.appspot.com",
    messagingSenderId: "738207787753",
    appId: "1:738207787753:web:edb93ab65688d898aa1e78",
    measurementId: "G-7Z29PC4DXK"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
