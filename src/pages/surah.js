import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Surah() {
    const [details, setDetails] = useState([]);
    const [play, setPlay] = useState(false);
    const [pause, setPause] = useState(false);
    const [id, setId] = useState(false);
    const [ayat, setAyat] = useState([]);
    const [translate, setTranslate] = useState([]);
    const [error, setError] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        const getAyatList = async () => {
            await fetch(
                `http://api.alquran.cloud/v1/surah/${params.id}/editions/ar.abdulbasitmurattal`
            )
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then((responseJson) => {
                    setAyat(responseJson.data[0].ayahs);
                    setDetails(responseJson.data[0]);
                })
                .catch((error) => {
                    setError(error);
                    console.log(error);
                });
        };
        const getTranslate = async () => {
            await fetch(
                `http://api.alquran.cloud/v1/surah/${params.id}/id.indonesian`
            )
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then((responseJson) => {
                    setTranslate(responseJson.data.ayahs);
                })
                .catch((error) => {
                    setError(error);
                    console.log(error);
                });
        };
        getAyatList();
        getTranslate();
        console.log(ayat);
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-white dark:bg-bg_dark">
            <div className="flex flex-col items-center gap-5 py-5 mb-8">
                <div className="flex flex-row items-center self-start gap-5">
                    <button onClick={() => navigate("/")}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-gray-400 w-9 h-9"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11 17l-5-5m0 0l5-5m-5 5h12"
                            />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold text-main dark:text-light_secondary">
                        {details?.englishName}
                    </h1>
                </div>
                <div className="relative w-full py-10 mb-10 overflow-hidden shadow-xl dark:shadow-lg dark:shadow-gray-400 h-fit bg-gradient-to-r rounded-xl from-light_secondary to-main">
                    <div className="flex flex-col items-center justify-center w-full text-white">
                        <h2 className="text-3xl font-normal">
                            {details?.englishName}
                        </h2>
                        <p className="mb-3 text-lg font-light">
                            {details?.englishNameTranslation}
                        </p>
                        <div className="w-1/2 h-[0.5px] mb-5 bg-white"></div>
                        <p className="mb-5 font-light uppercase">
                            {details?.revelationType} ● {details?.numberOfAyahs}{" "}
                            ayat
                        </p>
                        <p className="text-4xl">
                            {params.id === "1" || params.id === "9"
                                ? ""
                                : "بِسْمِ للَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ"}
                        </p>
                    </div>
                    <img
                        className="absolute z-0 opacity-5 w-80 -right-7 -bottom-36"
                        src="https://i.postimg.cc/hGYb7qmQ/Flat-Al-Quran-01-ai.png"
                        alt=""
                    />
                </div>
                <div className="flex flex-col gap-3 pb-7">
                    {ayat &&
                        ayat.map((data, index) => {
                            return (
                                <div className="w-full h-fit">
                                    <div className="flex items-center justify-between w-full px-5 mb-5 rounded-xl h-14 text-main bg-main/10 dark:bg-light_primary/10">
                                        <p className="px-4 text-lg font-light text-center text-white rounded-full bg-main">
                                            {data.numberInSurah}
                                        </p>
                                        <div className="flex gap-5">
                                            <audio
                                                id={data.number}
                                                src={data.audio}
                                            ></audio>
                                            <button
                                                onClick={() =>
                                                    playAudio(data.number)
                                                }
                                            >
                                                {pause === false &&
                                                id === data.number ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-8 h-8"
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
                                                        className="w-8 h-8"
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
                                            <button>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-8 h-8"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    localStorage.setItem(
                                                        "last",
                                                        data.number
                                                    )
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-8 h-8"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 mb-5">
                                        <p className="self-end w-full text-4xl text-right">
                                            {index === 0 && params.id !== "1"
                                                ? data?.text.replace(
                                                      "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
                                                      ""
                                                  )
                                                : data?.text}
                                        </p>
                                        <p className="text-gray-500">
                                            {translate[index]?.text}
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

export default Surah;
