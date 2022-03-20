import React from "react";

function Home() {
    return (
        <div className="w-full bg-white dark:bg-bg_dark">
            <div className="py-5">
                <div className="flex flex-row items-center justify-between mb-7">
                    <h1 className="text-xl font-bold text-main">
                        Quran Web App
                    </h1>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <div className="mb-5">
                    <p className="text-lg text-gray-500">Assalamu'alaikum</p>
                    <p className="text-2xl font-semibold">Hamba Allah</p>
                </div>
                <div className="flex items-center justify-center">
                    <div className="relative flex items-start w-full h-40 overflow-hidden rounded-3xl bg-gradient-to-r from-light_secondary to-main">
                        <div className="flex flex-col justify-between h-full px-5 py-10">
                            <div className="flex items-center justify-center gap-1 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                                <p className="text-sm font-medium ">
                                    Last Read
                                </p>
                            </div>
                            <div className="text-white">
                                <p className="text-lg font-semibold">
                                    Al Fatihah
                                </p>
                                <p className="text-sm font-light">Ayat 1</p>
                            </div>
                        </div>
                        <img
                            className="absolute w-64 -right-7 -bottom-24"
                            src="https://i.postimg.cc/hGYb7qmQ/Flat-Al-Quran-01-ai.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
