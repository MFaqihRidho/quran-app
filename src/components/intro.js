import React from "react";

function Intro() {
    return (
        <div className="container absolute flex flex-col items-center justify-center w-full py-10 mx-auto">
            <h1 className="mb-3 text-3xl font-bold text-main">Quran Web App</h1>
            <p className="mb-5 text-lg text-gray-500">
                Halo Selamat Datang! <br /> Mari Membaca Quran
            </p>
            <img
                className="rounded-3xl w-72"
                src="https://i.postimg.cc/0258QtgD/Flat-Al-Quran-01-ai-1.png"
                alt=""
            />
            <button className="py-3.5 -mt-4 text-lg font-semibold text-white px-7 bg-light_secondary rounded-3xl">
                Mulai Membaca
            </button>
        </div>
    );
}

export default Intro;
