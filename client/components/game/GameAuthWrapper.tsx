"use client";

import { useAuthContext } from "@/context/AuthContext";
import type { Game } from "@chessu/types";
import { useContext } from "react";

import GamePage from "./GamePage";

export default function GameAuthWrapper({ initialLobby }: { initialLobby: Game }) {
    const { user } = useAuthContext();

  if (!user || !user?.uid) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-2xl font-bold">Loading</div>
        <div className="text-xl">Waiting for authentication...</div>
      </div>
    );
  }

  return <GamePage initialLobby={initialLobby} />;
}