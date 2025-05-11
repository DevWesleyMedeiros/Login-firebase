import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
<<<<<<< HEAD
import { getFirestore } from "firebase/firestore";
=======
import { getFirestore } from "firebase/firestore"; // Removidas importações não usadas neste arquivo
>>>>>>> refactor/vanillaJs-to-react

// Suas variáveis de ambiente VITE_ precisam estar em um arquivo .env na raiz do projeto
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
<<<<<<< HEAD
  appId: import.meta.env.VITE_FIREBASE_APP_ID
=======
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // Se você tiver
>>>>>>> refactor/vanillaJs-to-react
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
<<<<<<< HEAD
=======

// Para usar 'collection', 'getDocs', 'query', 'where', importe-os e use-os onde necessário,
// não apenas exporte de firebaseConfig.js
// Exemplo de como você poderia exportar funções que usam o Firestore:
// export const getSomeData = async () => {
//   const q = query(collection(db, "yourCollection"), where("someField", "==", "someValue"));
//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// };
>>>>>>> refactor/vanillaJs-to-react
