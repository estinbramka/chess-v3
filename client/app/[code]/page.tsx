"use client"

import GameAuthWrapper from "@/components/game/GameAuthWrapper";
import { useAuthContext } from "@/context/AuthContext";
import { fetchActiveGame } from "@/lib/game";
import React from "react";
import type { Game } from "@chessu/types";
import NavBar from "@/components/NavBar";

export default function Game({ params }: { params: { code: string } }) {
    const { user } = useAuthContext();
    const [game, setGame] = React.useState<Game | undefined | null>(null);
    React.useEffect(() => {
        async function fetchData() {
            const fetchGame = await fetchActiveGame(params.code, await user?.getIdToken());
            setGame(fetchGame);
        }
        fetchData();
    }, [])

    if (game === null) {
        return (<div className='flex h-screen justify-center'><span className="loading loading-spinner loading-lg"></span></div>)
    } else if (game === undefined) {
        return (
            <div className="min-h-screen">
                <NavBar />
                <div className='flex justify-center items-center text-4xl mt-20'>Game Not Found</div>
            </div>
        )
    } else {
        return (
            <div className="min-h-screen">
                <NavBar />
                <GameAuthWrapper initialLobby={game} />
            </div>
        )
    }
}