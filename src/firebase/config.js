import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  orderBy,
  query,
  getDocs,
  addDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

setPersistence(auth, browserSessionPersistence);

provider.setCustomParameters({
  prompt: "select_account",
});

// Authorization block

const userA = auth.currentUser;
console.log("🚀 ~ file: config.js:53 ~ userA:", userA);

export const loginWithGooglePopup = () => signInWithPopup(auth, provider);
export const loginWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const createAccountEmailPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginAccountEmailPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
  await signOut(auth);
  return true;
};

export const authStateChanged = (callback) => {
  onAuthStateChanged(auth, callback);
};

// Database block

export const createUserAuth = async (userAuth, additinalInfo = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnap = await getDoc(userDocRef);

  if (!userSnap.exists()) {
    const { displayName, email } = userAuth;
    // console.log(displayName);
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additinalInfo,
      });
      const todoRef = collection(db, `users/${userAuth.uid}/todos`);
      // await addDoc(todoRef, {});
    } catch (error) {
      console.log("Error has occured when created user", error.message);
    }
  }
  return userDocRef;
};

export const createTodo = async (todo = {}) => {
  console.log("🚀 ~ file: config.js:101 ~ createTodo ~ todo:", todo);

  const user = auth.currentUser;
  if (user) {
    try {
      const todoRef = collection(db, `users/${user.uid}/todos`);
      const todoresult = await addDoc(todoRef, {
        ...todo,
        timestamp: serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.log("Error has occured when created todo", error.message);
      return false;
    }
  }
  // console.log("🚀 ~ file: config.js:101 ~ createTodo ~ user:", user)
  // console.log("🚀 ~ file: config.js:103 ~ createTodo ~ todoresult:", todoresult)
};

export const fetchAllTodosForUser = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const todosRef = collection(db, `users/${user.uid}/todos`);
      const q = query(todosRef, orderBy("timestamp", "desc"));
      const querySnap = await getDocs(q);
      let todoArray = [];
      // console.log(
      //   "🚀 ~ file: config.js:122 ~ fetchAllTodosForUser ~ querySnap:",
      //   querySnap.docs
      // );
      querySnap.docs.forEach((item) => {
        // console.log(item.data());
        todoArray.push({
          id: item.id,
          ...item.data(),
        });
      });
      // console.log(todoArray);
      return todoArray;
    } catch (error) {
      console.log("Error has occured when created todo", error.message);
      return null;
    }
  }
};

export const removeDoc = async (id) => {
  const user = auth.currentUser;
  if (user) {
    try {
      // const todosRef = collection(db, `users/${user.uid}/todos`);
      await deleteDoc(doc(db, `users/${user.uid}/todos`, id));
      return true;
    } catch (error) {
      console.log("Error has occured when delete todo", error.message);
      return false;
    }
  }
};

export const updateTodo = async (id, title) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const todoRef = doc(db, `users/${user.uid}/todos`, id);
      await setDoc(todoRef, { title }, { merge: true });
      return true;
    } catch (error) {
      console.log("Error has occured when update todo", error.message);
      return false;
    }
  }
};

export const changeStatusTodo = async (id) => {
  const user = auth.currentUser;
  try {
    const todoRef = doc(db, `users/${user.uid}/todos`, id);
    const value = await getDoc(todoRef);
    const { finished } = value.data();
    console.log("finished need", finished);
    await setDoc(todoRef, { finished: !finished }, { merge: true });
    return true;
  } catch (error) {
    console.log(
      "Error has occured when change todo completion status",
      error.message
    );
    return false;
  }
};
// export { app, db, auth };
