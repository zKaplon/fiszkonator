import { initializeApp } from "firebase/app";
import { getFirestore, 
    // collection, addDoc 
} from "firebase/firestore";

const firebaseApp = initializeApp({
	apiKey: "AIzaSyDqLWtrc7R7ugeCxdrEzu57RFAI9l4Oc4M",
	authDomain: "fiszkonator.firebaseapp.com",
	projectId: "fiszkonator",
	storageBucket: "fiszkonator.appspot.com",
	messagingSenderId: "844881014623",
	appId: "1:844881014623:web:dcfce9aa0e93a7caaa50ea",
	measurementId: "G-GTZXBJS0JB",
});

const db = getFirestore(firebaseApp);

export {db};