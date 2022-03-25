import React from "react";

function Modal(props) {
    return (
        <div
            className={`container fixed top-0 bottom-0 left-0 right-0 z-50 ${
                props.show ? "flex" : "hidden"
            } flex-col items-center justify-center w-full max-w-[800px] h-screen py-10 mx-auto bg-bg_dark/50`}
        >
            {" "}
            <div
                id={props.id}
                className="flex flex-col items-center justify-center w-[80%] gap-5 px-10 py-5 shadow-xl rounded-xl h-[30%] bg-main "
            >
                <p className="text-2xl text-center text-white">{props.title}</p>
                <div className="flex items-center justify-center w-full gap-5">
                    <button
                        onClick={props.no}
                        className="px-5 py-1 text-xl text-center text-white rounded-xl bg-dark_primary"
                    >
                        No
                    </button>
                    <button
                        onClick={props.yes}
                        className="px-5 py-1 text-xl text-center text-white rounded-xl bg-dark_primary"
                    >
                        Yes
                    </button>
                </div>
            </div>{" "}
        </div>
    );
}

export default Modal;
