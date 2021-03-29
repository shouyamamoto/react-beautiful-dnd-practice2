import firebase from "firebase/app"
import "firebase/app"
import "firebase/firestore" // データベースを使うためにモジュール
import "firebase/auth" // 認証機能を使うためのモジュール

const firebaseApp = firebase.initializeApp({ // initializeAppでFirebaseを初期化する
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const db = firebaseApp.firestore()
export const auth = firebase.auth()