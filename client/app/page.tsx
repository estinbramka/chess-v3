"use client"
import NavBar from "@/components/NavBar";
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from 'next/navigation'
import React from "react";

export default function Home() {
  const router = useRouter()
  const { user } = useAuthContext();

  React.useEffect(() => {
    if (user === null) {
      return router.push("/signin")
    }
  }, [user])

  return (
    <div>
      <NavBar />
      <div>hello {JSON.stringify(user)}</div>
    </div>
  )
}
