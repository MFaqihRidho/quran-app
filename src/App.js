import React from "react";
import Intro from "./components/intro";
import Home from "./components/home";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="flex items-center justify-center font-poppins ">
            <div className="max-w-[800px] relative min-w-[400px] max-h-screen dark:bg-bg_dark bg-white">
                <Intro></Intro>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
