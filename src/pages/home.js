import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SurahLoading from "../components/surah loading";

function Home() {
    const [data, setData] = useState([]);
    const [last, setLast] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const handleClickSurah = (event) => {
        event.preventDefault();
        navigate(`/surah/${event.currentTarget.id}`);
    };

    const handleClickHeader = (event,number) => {
        event.preventDefault();
        navigate(`/surah/${number}`);
    }

    useEffect(() => {
        let lastAyat = localStorage.getItem("last");
        setLoading(true);
        const getSurahList = async () => {
            await fetch(`https://api.alquran.cloud/v1/surah`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then((responseJson) => {
                    setData(responseJson.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setError(error);
                });
        };
        const getLastAyat = async () => {
            await fetch(
                `https://api.alquran.cloud/v1/ayah/${lastAyat ? lastAyat : 1}`
            )
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Something went wrong");
                })
                .then((responseJson) => {
                    setLast(responseJson.data);
                })
                .catch((error) => {
                    console.log(error);
                    setError(error);
                });
        };
        getSurahList();
        getLastAyat();
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-white dark:bg-bg_dark">
            <div className="py-5">
                <div className="flex flex-row items-center justify-between mb-7">
                    <h1 className="text-xl font-bold text-main dark:text-light_secondary">
                        Quran Web App
                    </h1>
                </div>
                <div className="mb-5">
                    <p className="text-lg text-gray-500">Assalamu'alaikum</p>
                    <p className="text-2xl font-semibold">Hamba Allah</p>
                </div>
                <div className="flex items-center justify-center mb-10">
                    <div onClick={(e) => handleClickHeader(e,last?.surah?.number)} className="relative flex items-start w-full h-40 overflow-hidden rounded-2xl bg-gradient-to-r from-light_secondary to-main">
                        <div className="flex flex-col justify-between h-full gap-5 px-5 py-10">
                            <div className="flex items-center justify-center gap-1 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                </svg>
                                <p className="text-lg font-medium ">
                                    Last Read
                                </p>
                            </div>
                            <div className="text-white">
                                <p className="text-lg font-semibold">
                                    {last?.surah?.englishName}
                                </p>
                                <p className="text-sm font-light">
                                    Ayat no : {last?.numberInSurah}
                                </p>
                            </div>
                        </div>
                        <img
                            className="absolute w-64 -right-7 -bottom-24"
                            src="https://i.postimg.cc/hGYb7qmQ/Flat-Al-Quran-01-ai.png"
                            alt=""
                        />
                    </div>
                </div>
                {loading && <SurahLoading></SurahLoading>}
                <div className="flex flex-col gap-5 pb-20">
                    {data &&
                        data.map((data) => {
                            return (
                                <div
                                    onClick={(e) => handleClickSurah(e)}
                                    id={data.number}
                                    className="flex flex-col gap-5 cursor-pointer"
                                >
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center gap-6 px-3">
                                            <div className="relative flex items-center justify-center w-3 h-3">
                                                <svg
                                                    className="absolute inline-flex w-9 h-9 fill-main dark:fill-light_secondary"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M16.142 2l5.858 5.858v8.284l-5.858 5.858h-8.284l-5.858-5.858v-8.284l5.858-5.858h8.284zm.829-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029z" />
                                                </svg>
                                                <p className="relative inline-flex">
                                                    {data.number}
                                                </p>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-xl font-medium">
                                                    {data.englishName}
                                                </p>
                                                <p className="text-sm font-light text-gray-500 uppercase">
                                                    {data.revelationType} ●{" "}
                                                    {data.numberOfAyahs} ayat
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-4xl text-main dark:text-light_secondary">
                                            {data.name.replace("سُورَةُ", "")}
                                        </p>
                                    </div>
                                    <div className="w-full h-[0.5px] bg-gray-500"></div>
                                </div>
                            );
                        })}
                </div>
                <h1>{error}</h1>
            </div>
        </div>
    );
}

export default Home;
