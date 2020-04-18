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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (error) {
            console.log('error creating user',error.message);
        }
    }
    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
 const collectionRef = firestore.collection(collectionKey);
 
 const batch = firestore.batch();
 objectsToAdd.forEach(obj => {
     const newDocRef = collectionRef.doc(obj.title);
     batch.set(newDocRef, obj);
 });
 return await batch.commit()
};
export const convertCollectionsSnapshotToMap = (collections) => {
const transformedCollection = collections.docs.map( doc => {
 const {title, items} = doc.data();
 return {
     routeName: encodeURI(title.toLowerCase()),
     id: doc.id,
     title, 
     items
 }
});
return transformedCollection.reduce((accumulator,collection) => {
accumulator[collection.title.toLowerCase()]=collection;
return accumulator;
},{});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
