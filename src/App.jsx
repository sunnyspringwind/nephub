import React, { useState, useEffect } from "react";
import Test from "./Test";
import LandingPage from "./components/LandingPage";
import Timeline from "./components/TimelinePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import QuizLibrary from "./components/QuizLibarary";
import UpdateRequests from "./components/UpdateRequests";
import Register from "./components/Register";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import { HallOfFamePage, ProfilePage } from "./components/HallofFame";
import DynamicQuiz from "./components/DynamicQuiz";
import { fetchData } from "./utils/api";
import AdminDashboard from "./adminPages/AdminDashboard";
import AboutPage from "./components/AboutPage";

export default function App() {

    const [quizApi, setQuizApi] = useState([]);
    //loads quiziz data from api
      useEffect(() => {
        const fetchQuizData = async () => {
          const quizData = await fetchData("/api/Quiziz");
          setQuizApi(quizData.data);
        };
        fetchQuizData();
      }, []);

  return (
    <>
      {/* <Test /> */}
      {/* <LandingPage/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/hall-of-fame" element={<HallOfFamePage />} />
          <Route path="/quizzes" element={<QuizLibrary />} />
          <Route
            path="/quizzes/:category"
            element={
              <DynamicQuiz
                quizApi={quizApi}
                quizTitle="Test Your Knowledge of Nepal"
                timeLimit={300} // Optional: 5 minute time limit (set to 0 for no time limit)
              />
            }
          />
          <Route path="/update-requests" element={<UpdateRequests />} />
          <Route path="/profiles/:id" element={<ProfilePage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
