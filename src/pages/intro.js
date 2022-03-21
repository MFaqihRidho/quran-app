import React, { useEffect } from "react";
import gsap from "gsap";

function Intro() {
    let height = -window.innerHeight;

    const started = () => {
        gsap.fromTo(
            "#intro",
            { y: 0 },
            { y: height - 250, duration: 4, ease: "circ" }
        );
        localStorage.setItem("intro", "false");
    };

    return (
        <div
            id="intro"
            className="container fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-full h-screen py-10 mx-auto bg-white dark:bg-bg_dark"
        >
            <h1 className="mb-3 text-3xl font-bold text-main">Quran Web App</h1>
            <p className="mb-5 text-lg text-center text-gray-500">
                Assalamu'alaikum <br /> Mari Membaca Quran
            </p>
            <img
                className="rounded-3xl w-72"
                src="https://i.postimg.cc/0258QtgD/Flat-Al-Quran-01-ai-1.png"
                alt=""
            />
            <button
                onClick={() => started()}
                className="py-3.5 -mt-6 text-lg font-semibold text-white px-7 bg-light_secondary rounded-3xl"
            >
                Mulai Membaca
            </button>
        </div>
    );
}

export default Intro;
