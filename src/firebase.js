import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCq_UwQno17WwCESreGPB5PBVlCONWkGTE",
  authDomain: "whatsapp-clone-904e4.firebaseapp.com",
  projectId: "whatsapp-clone-904e4",
  storageBucket: "whatsapp-clone-904e4.appspot.com",
  messagingSenderId: "1081165565679",
  appId: "1:1081165565679:web:58d6e267cbdb46843c951a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
