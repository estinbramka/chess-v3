"use client"
import NavBar from "@/components/NavBar";
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from 'next/navigation'
import React from "react";
import { API_URL } from "@/config";

export default function Home() {
  const router = useRouter()
  const { user } = useAuthContext();
  const [test, setTest] = React.useState('');
  //fetch(`${API_URL}/v1/games/helloworld`).then(res => res.json()).then(res => console.log(res));

  React.useEffect(()=>{
    async function fetchData() {
      const token = await user?.getIdToken()
      const response = await fetch(`${API_URL}/v1/games/helloworld`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = await response.json()
      setTest(JSON.stringify(result))
      console.log(result);
    }
    fetchData();
  },[])

  React.useEffect(() => {
    if (user === null) {
      return router.push("/signin")
    }
  }, [user])

  return (
    <div>
      <NavBar />
      <div>hello {JSON.stringify(user)}</div>
      <div>test {test}</div>
    </div>
  )
}
