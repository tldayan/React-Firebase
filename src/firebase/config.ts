import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB5-Vl3EtByUrZ1WRYmkcOheWCXex-ZVnE",
  authDomain: "reacttest-1dab2.firebaseapp.com",
  databaseURL: "https://reacttest-1dab2-default-rtdb.firebaseio.com",
  projectId: "reacttest-1dab2",
  storageBucket: "reacttest-1dab2.firebasestorage.app",
  messagingSenderId: "843753818779",
  appId: "1:843753818779:web:b7f0e9bb9dd6ea10b8143e"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);