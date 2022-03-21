import React, { useState, useEffect } from "react";

function Settings() {
    const [theme, setTheme] = useState("dark");

    const handleSetTheme = (e) => {
        setTheme(e.target.value);
        localStorage.setItem("theme", e.target.value);
        if (localStorage.theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    useEffect(() => {
        if (localStorage.theme === "dark") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    });

    return (
        <div className="relative w-full bg-white dark:bg-bg_dark">
            <div className="py-5">
                <div className="flex flex-row items-center justify-between mb-7">
                    <h1 className="text-xl font-bold text-main">Settings</h1>
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7"
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
                    </button>
                </div>
                <div className="flex items-center w-full gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                    </svg>
                    <div className="w-full">
                        <p className="text-lg font-semibold">Select Theme</p>
                        <svg
                            class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 412 232"
                        >
                            <path
                                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                                fill="#648299"
                                fill-rule="nonzero"
                            />
                        </svg>
                        <select
                            onChange={(e) => handleSetTheme(e)}
                            className="w-full h-10 px-5 text-center bg-white border-2 border-gray-400 rounded-lg outline-none appearance-none focus:border-main dark:bg-bg_dark focus:outline-none active:outline-none"
                            name=""
                            id=""
                            value={theme}
                        >
                            <option value="dark">dark</option>
                            <option value="light">light</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
