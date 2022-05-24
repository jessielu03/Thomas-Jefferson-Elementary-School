import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Administrator from './Components/AdminFile/Administrator';
import Teacher from './Components/TeacherFile/Teacher';
import { getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element = {<App/>}/>
      <Route path = 'teacher' element={<Teacher/>}/>
      <Route path = 'administrator' element={<Administrator/>}/>
      <Route path='administrator/AdminClassPage' element={<AdminClassPage/>}/>
      <Route path='administrator/StudentDirectory' element={<StudentDirectory/>}/>
      <Route path='administrator/TeacherDirectory' element={<TeacherDirectory/>}/>

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
