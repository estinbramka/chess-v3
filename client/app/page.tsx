"use client"
import NavBar from "@/components/NavBar";
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from 'next/navigation'
import React from "react";
import { API_URL } from "@/config";
import CreateGame from "@/components/home/CreateGame";
import JoinGame from "@/components/home/JoinGame";
import PublicGames from "@/components/home/PublicGames/PublicGames";

export const revalidate = 0;

export default function Home() {
  const router = useRouter()
  const { user } = useAuthContext();

  React.useEffect(() => {
    if (user === null) {
      return router.push("/signin")
    }
  }, [user])

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="flex w-full flex-wrap items-center justify-center gap-8 px-4 py-10 lg:gap-16 ">
        <PublicGames />

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-xl font-bold leading-tight">Join from invite</h2>
            <JoinGame />
          </div>

          <div className="divider divider-vertical">or</div>

          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-xl font-bold leading-tight">Create game</h2>
            <CreateGame />
          </div>
        </div>
      </div>
    </div>
  )
}
