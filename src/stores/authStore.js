import { writable } from "svelte/store";
import { auth, db } from "../lib/firebase/firebase.client";
import { doc, setDoc, getDoc } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

export const authStore = writable({
  isLoading: true,
  currentUser: null,
});

export const authHandlers = {
  login: async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("userId", auth.currentUser.uid);
  },
  signup: async (email, password, username) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
        console.log(err)
      );
      await updateProfile(auth.currentUser, {
        displayName: username,
      }).catch((err) => console.log(err));
      await setDoc(doc(db, "user", auth.currentUser.uid), {
        trashThrown: 0,
      });
      localStorage.setItem("userId", auth.currentUser.uid);
    } catch (err) {
      err.message.replace(".", "");
      alert(err.message + "(" + err.code + ")");
    }
  },
  logout: async () => {
    await signOut(auth);
  },
  resetPassword: async (email) => {
    await sendPasswordResetEmail(auth, email);
  },
  updateEmail: async (email) => {
    await updateEmail(auth, email);
  },
  updatePassword: async (password) => {
    await updatePassword(auth, password);
  },
  getId: () => {
    return new Promise((resolve, reject) => {
      if (userId == undefined) {
        reject(new Error("undefined"));
        return;
      }
      resolve(userId);
    });
  },
};
