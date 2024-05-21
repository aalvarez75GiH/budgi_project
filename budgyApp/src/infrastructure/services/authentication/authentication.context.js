import React, { useState, createContext, useEffect } from "react";

export const AuthenticationContext = createContext();

// *************** Firebase SDK ***************************
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJOX6KidOi_hORsStV4-6RhmYMMkMUhyI",
  authDomain: "budgy-bd9b1.firebaseapp.com",
  projectId: "budgy-bd9b1",
  storageBucket: "budgy-bd9b1.appspot.com",
  messagingSenderId: "281121534822",
  appId: "1:281121534822:web:4495759dd1f39ec9da4ea7",
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();

// *****************************************************

export const AuthenticationContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToDB, setUserToDB] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("english");
  const [newTransaction, setNewTransaction] = useState(null);

  // ************* User Development env
  // const user = {
  //   first_name: "Arnoldo",
  //   last_name: "Alvarez",
  //   email: "arnoldo@gmail.com",
  //   isFirstTime: false,
  //   role: "user",
  //   uid: "o3kb7r9LoSdTmLfXfDfTo2aLs8i1",
  //   creation_date: "2024-04-09T02:41:08.861Z",
  //   user_id: "09438405-fc76-4be8-ba6b-8a509fb355ac",
  // };

  // ************* User Production env
  const user = {
    first_name: "Arnoldo",
    last_name: "Alvarez",
    email: "arnoldo@gmail.com",
    isFirstTime: false,
    role: "user",
    uid: "o3kb7r9LoSdTmLfXfDfTo2aLs8i1",
    creation_date: "2024-03-31T17:23:42.556Z",
    user_id: "34c110af-5d1e-41ee-948f-ca366ae3c53b",
  };

  useEffect(() => {
    setUserToDB(user);
    // signInWithEmailAndPassword(auth, "arnoldo@yahoo.com", "123456")
    //   .then((data_user) => {
    //     console.log(JSON.stringify(data_user, 0, 2));
    //     console.log(data_user.user.uid);
    //     console.log(data_user.user.email);
    //     setIsAuthenticated(true);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     setIsAuthenticated(false);
    //   });
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        language,
        db,
        app,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
