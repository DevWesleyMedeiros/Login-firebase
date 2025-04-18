import {
    initializeApp
} from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCbksuZIkuIYqzhaWBqXuu394wCCUNFyqo",
    authDomain: "cadastro-usuarios-9c21e.firebaseapp.com",
    projectId: "cadastro-usuarios-9c21e",
    storageBucket: "cadastro-usuarios-9c21e.firebasestorage.app",
    messagingSenderId: "594339524632",
    appId: "1:594339524632:web:629193861b36d79a15d36d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);