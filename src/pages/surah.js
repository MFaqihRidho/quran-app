import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "../components/modal";
import gsap from "gsap";

function Surah() {
    const [details, setDetails] = useState([]);
    const [play, setPlay] = useState(false);
    const [pause, setPause] = useState(false);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(false);
    const [local, setLocal] = useState(
        JSON.parse(localStorage.getItem("bookmark"))
    );
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

    const handleCLickLastRead = (data) => {
        setShow(true);
        setId(data);
        startedLastRead();
    };

    const startedLastRead = () => {
        gsap.fromTo(
            "#modal",
            { scale: 0 },
            { scale: 1, duration: 1, ease: "elastic" }
        );
    };

    const endedLastRead = () => {
        gsap.fromTo(
            "#modal",
            { scale: 1 },
            { scale: 0, duration: 1, ease: "elastic" }
        );
    };

    const handleClickYes = () => {
        localStorage.setItem("last", id);
        setTimeout(function () {
            setShow(false);
        }, 1000);
        setId("");
        endedLastRead();
    };

    const handleClickNo = () => {
        setTimeout(function () {
            setShow(false);
        }, 1000);
        setId("");
        endedLastRead();
    };

    const handleBookmark = (data) => {
        if (localStorage.getItem("bookmark") === null) {
            localStorage.setItem("bookmark", JSON.stringify([data]));
            setLocal([data]);
        } else if (
            JSON.parse(localStorage.getItem("bookmark")).some(
                (e) => e.data.number === data.data.number
            )
        ) {
            const lastData = JSON.parse(localStorage.getItem("bookmark"));
            const dataALl = lastData.filter(
                (book) => book.data.number !== data.data.number
            );
            localStorage.setItem("bookmark", JSON.stringify(dataALl));
            setLocal(dataALl);
        } else {
            const lastData = JSON.parse(localStorage.getItem("bookmark"));
            const dataAll = [...lastData, data];
            localStorage.setItem("bookmark", JSON.stringify(dataAll));
            setLocal(dataAll);
        }
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
                                <div id={data.number} className="w-full h-fit">
                                    <div className="flex items-center justify-between w-full px-5 mb-5 rounded-xl h-14 text-main bg-main/10 dark:bg-light_primary/10">
                                        <p className="px-4 text-lg font-light text-center text-white rounded-full bg-main">
                                            {data.numberInSurah}
                                        </p>
                                        <div className="flex gap-5">
                                            <audio
                                                id={`audio${data.number}`}
                                                src={data.audio}
                                            ></audio>
                                            <button
                                                onClick={() =>
                                                    playAudio(
                                                        `audio${data.number}`
                                                    )
                                                }
                                            >
                                                {pause === false &&
                                                id === `audio${data.number}` ? (
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
                                                onClick={() =>
                                                    handleBookmark({
                                                        data,
                                                        surah: details.number,
                                                        translate:
                                                            translate[index]
                                                                ?.text,
                                                    })
                                                }
                                            >
                                                {local &&
                                                local.some(
                                                    (e) =>
                                                        e.data.number ===
                                                        data.number
                                                ) ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-10 h-10"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
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
                                                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleCLickLastRead(
                                                        data.number
                                                    )
                                                }
                                            >
                                                {localStorage.getItem(
                                                    "last"
                                                ) === data.number.toString() ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-10 h-10"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                                            clipRule="evenodd"
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
                                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                        />
                                                    </svg>
                                                )}
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
                <h1>{error}</h1>
            </div>
            <Modal
                title={"Do you really want to mark this verse as last read?"}
                show={show}
                no={() => handleClickNo()}
                yes={() => handleClickYes()}
            ></Modal>
        </div>
    );
}

export default Surah;
