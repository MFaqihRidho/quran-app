import React from "react";
import Intro from "./components/intro";

function App() {
    return (
        <div className="flex items-center justify-center font-poppins ">
            <div className="max-w-[800px] relative min-w-[400px] min-h-screen dark:bg-bg_dark bg-white">
                <Intro></Intro>
            </div>
        </div>
    );
}

export default App;
