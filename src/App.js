import React, { useEffect, useState } from "react";
import Intro from "./components/intro";
import Home from "./components/home";
import { Routes, Route } from "react-router-dom";

function App() {
    const [intro, setIntro] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("intro") === "false") {
            setIntro(false);
        }
    }, []);

    return (
        <div className="flex items-center justify-center font-poppins ">
            <div className="max-w-[800px] w-full container mx-auto px-5 relative min-w-[300px] dark:bg-bg_dark bg-white">
                {intro && <Intro></Intro>}
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
