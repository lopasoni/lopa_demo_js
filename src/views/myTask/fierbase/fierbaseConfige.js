import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUf8oZx6zKuHQHPMj8TOXWYn2iEumVHlk",
  authDomain: "singupfuntionallity.firebaseapp.com",
  projectId: "singupfuntionallity",
  storageBucket: "singupfuntionallity.appspot.com",
  messagingSenderId: "81425745422",
  appId: "1:81425745422:web:5c399ceda797b5ebe3de5f",
  measurementId: "G-H5RMJTBKE4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

export { auth, provider, fbProvider };
