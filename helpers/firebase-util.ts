import firebase from "firebase/compat/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlt6O1SoNkaP0pBtXSheYyfnW1gXojyFA",
  authDomain: "next-practice-d9f57.firebaseapp.com",
  databaseURL:
    "https://next-practice-d9f57-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "next-practice-d9f57",
  storageBucket: "next-practice-d9f57.appspot.com",
  messagingSenderId: "726927164481",
  appId: "1:726927164481:web:5ab96b8d1f6f056be0f2c0",
};

const app = firebase.initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;

const uploadImageToFirebase = async (image: any, name: string) => {
  const fileName = `images/${name}`;
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, image);
  return getDownloadURL(storageRef).then((url) => {
    return url;
  });
};

export { uploadImageToFirebase };
