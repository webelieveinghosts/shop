"use client"

import { useEffect, useState } from "react"

export const Timer = () => {
    const [timer, setTimer] = useState(1809556140000 - Date.now())

    useEffect(() => {
        const interval = setInterval(() => setTimer(1809556140000 - Date.now()), 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    const seconds = Math.floor((timer / 1000) % 60), minutes = Math.floor((timer / (1000 * 60)) % 60), hours = Math.floor((timer / (1000 * 60 * 60)) % 24)

    return (
        <div className="relative overflow-hidden h-screen w-full flex flex-col items-center justify-center text-center text-white">
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-90"></div>

            <div className="z-10 font-bold text-sm">
                AGUARDANDO O NOVO DROP
            </div>

            <div className="flex items-end justify-center z-10">
                {/*<div className="m-2 sm:m-5">
                    <span className="text-primary font-bold text-xl sm:text-5xl">{timer.getDay()}</span>
                    <p>Dias</p>
                </div>*/}
                <div className="m-2 sm:m-5">
                    <span className="text-primary font-bold text-xl sm:text-5xl">{hours}</span>
                    <p>Horas</p>
                </div>
                <div className="m-2 sm:m-5">
                    <span className="text-primary font-bold text-xl sm:text-5xl">{minutes}</span>
                    <p>Minutos</p>
                </div>
                <div className="m-2 sm:m-5">
                    <span className="text-primary font-bold text-xl sm:text-5xl">{seconds}</span>
                    <p>Segundos</p>
                </div>
            </div>
        </div>
    )
}