import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWLn2Lj216Vl4PfZD-77zs-2bzkkuOvdI",
  authDomain: "farmcity-files.firebaseapp.com",
  projectId: "farmcity-files",
  storageBucket: "farmcity-files.appspot.com",
  messagingSenderId: "513765127002",
  appId: "1:513765127002:web:027e737bb1a74740c0f963",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
