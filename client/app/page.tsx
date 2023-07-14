"use client"
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const { user } = useAuthContext();
  
  if (user===null) {
    return router.push("/signin")
  }

  return (
    <div>hello {JSON.stringify(user)}</div>
  )
}
