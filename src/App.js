import React, { useEffect, useState } from "react";
import Intro from "./pages/intro";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
import Settings from "./pages/settings";
import Surah from "./pages/surah";

function App() {
    const [intro, setIntro] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("intro") === "false") {
            setIntro(false);
        }
    }, []);

    return (
        <div className="flex items-center justify-center font-poppins ">
            <div className="max-w-[800px] w-full container mx-auto px-5 relative min-w-[300px] text-black dark:text-white dark:bg-bg_dark bg-white">
                {intro && <Intro></Intro>}
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/settings" element={<Settings />}></Route>
                    <Route path="/surah/:id" element={<Surah />}></Route>
                </Routes>
                <Nav></Nav>
            </div>
        </div>
    );
}

export default App;
