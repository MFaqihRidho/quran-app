import React, { useState, useEffect } from "react";

function Bookmark() {
    const [local, setLocal] = useState(
        JSON.parse(localStorage.getItem("bookmark"))
    );
    const [play, setPlay] = useState(false);
    const [pause, setPause] = useState(false);
    const [id, setId] = useState(false);

    const playAudio = (data) => {
        const audio = document.getElementById(data);
        if (play === false) {
            audio.play();
            setId(data);
            setPlay(true);
        } else if (pause === false && id === data && play === true) {
            audio.pause();
            setPause(true);
        } else if (pause === true && id === data && play === true) {
            audio.play();
            setPause(false);
        } else if (pause === true && id !== data && play === true) {
            audio.play();
            setId(data);
            setPause(false);
        }
        audio.onended = () => {
            setPlay(false);
            setPause(false);
            setId("");
        };
    };

    const handleBookmark = (data) => {
        const lastData = JSON.parse(localStorage.getItem("bookmark"));
        const dataALl = lastData.filter(
            (book) => book.data.number !== data.data.number
        );
        localStorage.setItem("bookmark", JSON.stringify(dataALl));
    };

    useEffect(() => {
        console.log(local);
    });

    return (
        <div className="relative w-full min-h-screen bg-white dark:bg-bg_dark">
            <div className="py-5">
                <div className="flex flex-row items-center justify-between mb-7">
                    <h1 className="text-xl font-bold text-main dark:text-light_secondary">
                        Bookmark
                    </h1>
                </div>
                <div className="flex flex-col gap-3 pb-7">
                    {local.map((data) => {
                        return (
                            <div>
                                <div className="flex items-center justify-between w-full px-5 mb-5 rounded-xl h-14 text-main bg-main/10 dark:bg-light_primary/10">
                                    <p className="px-4 text-lg font-light text-center text-white rounded-full bg-main">
                                        {`${data.surah} : ${data.data.numberInSurah}`}
                                    </p>
                                    <div className="flex gap-5">
                                        <audio
                                            id={`audio${data.data.number}`}
                                            src={data.data.audio}
                                        ></audio>
                                        <button
                                            onClick={() =>
                                                playAudio(
                                                    `audio${data.data.number}`
                                                )
                                            }
                                        >
                                            {pause === false &&
                                            id ===
                                                `audio${data?.data?.number}` ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-10 h-10"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-10 h-10"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleBookmark(data)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-10 h-10"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 mb-5">
                                    <p className="self-end w-full text-4xl text-right">
                                        {data.data.numberInSurah === 1 &&
                                        data.surah !== 1
                                            ? data.data?.text.replace(
                                                  "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
                                                  ""
                                              )
                                            : data.data?.text}
                                    </p>
                                    <p className="text-gray-500">
                                        {data.translate}
                                    </p>
                                </div>
                                <div className="w-full h-[0.5px] mb-5 bg-gray-500"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Bookmark;
