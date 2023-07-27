import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9b1x607WUQO3uICrkZyeV26INIWq5yy4",
  authDomain: "perfect-app-5eef5.firebaseapp.com",
  projectId: "perfect-app-5eef5",
  storageBucket: "perfect-app-5eef5.appspot.com",
  messagingSenderId: "155357764653",
  appId: "1:155357764653:web:15c74013629e4da5236ca4",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
