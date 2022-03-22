import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Surah() {
    const [details, setDetails] = useState([]);
    const [ayat, setAyat] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getSurahDetails = async () => {
            await fetch(
                `http://api.quran.com/api/v3/chapters/${params.id}?language=id`
            )
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then((responseJson) => {
                    setDetails(responseJson.chapter);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        const getAyatList = async () => {
            await fetch(
                `http://api.quran.com/api/v3/chapters/${params.id}/verses?language=id&translations=33`
            )
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then((responseJson) => {
                    setAyat(responseJson.verses);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getSurahDetails();
        getAyatList();
        console.log(ayat);
        console.log(ayat);
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-white dark:bg-bg_dark">
            <div className="py-5">
                <div className="flex flex-row items-center gap-5 mb-7">
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
                        {details?.name_simple}
                    </h1>
                </div>
                <div className="relative w-full py-10 overflow-hidden shadow-xl dark:shadow-lg dark:shadow-gray-400 h-fit bg-gradient-to-r rounded-xl from-light_secondary to-main">
                    <div className="flex flex-col items-center justify-center w-full text-white">
                        <h2 className="text-3xl font-normal">
                            {details?.name_complex}
                        </h2>
                        <p className="mb-3 text-lg font-light">
                            {details?.translated_name?.name}
                        </p>
                        <div className="w-1/2 h-[0.5px] mb-5 bg-white"></div>
                        <p className="mb-5 font-light uppercase">
                            {details?.revelation_place} ●{" "}
                            {details?.verses_count} ayat
                        </p>
                        <p className="text-4xl">
                            {details?.bismillah_pre &&
                                "بِسْمِ للَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ"}
                        </p>
                    </div>
                    <img
                        className="absolute z-0 opacity-5 w-80 -right-7 -bottom-36"
                        src="https://i.postimg.cc/hGYb7qmQ/Flat-Al-Quran-01-ai.png"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

export default Surah;
