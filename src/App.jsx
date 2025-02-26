import React from "react";
import Test from "./Test";
import LandingPage from "./components/LandingPage";
import Timeline from "./components/TimelinePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RankingLibrary from "./components/RankingLibrary";
import RichestPeople from "./components/RichestPage";
import PrimeMinisters from "./components/PrimeMinistersPage";
import QuizLibrary from "./components/QuizLibarary";
import QuizAboutNepal from "./components/QuizAboutNepal";
import QuizAboutRichest from "./components/QuizAboutRichest";
import UpdateRequests from "./components/UpdateRequests";
import Register from "./components/Register";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";

export default function App () {


    return (
        <>
        {/* <Test /> */}
        {/* <LandingPage/> */}
        <BrowserRouter >
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/timeline" element={<Timeline/>}/>
            <Route path="/rankings-nepal" element={<RankingLibrary/>}/>
            <Route path="/rankings-nepal/prime-ministers" element={<PrimeMinisters/>}/>
            <Route path="/rankings-nepal/rich-list" element={<RichestPeople/>}/>
            <Route path="/quizzes" element={<QuizLibrary/>}/>
            <Route path="/quizzes/about-nepal" element={<QuizAboutNepal/>}/>
            <Route path="/quizzes/about-richest" element={<QuizAboutRichest/>}/>
            <Route path="/update-requests" element={<UpdateRequests/>}/>
            <Route path="/user-dashboard" element={<UserDashboard/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>


        </Routes>
        </BrowserRouter>
        </>
    )
}