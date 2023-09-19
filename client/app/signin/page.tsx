'use client'
import { useRouter } from 'next/navigation'
import React, { FormEvent } from "react";
import Image from 'next/image'
import signIn, { signInAnonymous, signInGoogle } from '@/firebase/auth/signin';
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';

export default function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')
    const router = useRouter()
    const { user } = useAuthContext();

    React.useEffect(() => {
        if (user) {
            return router.push("/")
        }
    }, [user])

    async function handleGoogleSignIn(){
        const { result, error } = await signInGoogle();

        if (error) {
            setErrorMessage('Failed to Create Google Account')
            return console.log(error)
        }

        // else successful
        console.log(result)
        return //router.push("/")
    }

    async function handleGuest() {
        const { result, error } = await signInAnonymous();

        if (error) {
            setErrorMessage('Failed to Create Guest Account')
            return console.log(error)
        }

        // else successful
        console.log(result)
        return //router.push("/")
    }

    async function handleForm(event: FormEvent) {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            setErrorMessage('Incorrect username or password')
            return console.log(error)
        }

        // else successful
        console.log(result)
        return //router.push("/")
    }

    return (
        <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image className="mx-auto h-10 w-auto" src="/logo/chess-low-resolution-logo-color-on-transparent-background.png" alt="Your Company" width={1000} height={699} />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className={`alert alert-error mt-10 sm:mx-auto sm:w-full sm:max-w-sm ${errorMessage === '' && 'hidden'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{errorMessage}</span>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleForm} className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>

                <div className="flex items-center justify-center bg-gray-100 mt-5">
                    <button onClick={handleGoogleSignIn} type='button' className="flex flex-grow justify-center items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                        <span>Continue with Google</span>
                    </button>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500 flex justify-center items-center gap-1">
                    Not a member?
                    <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up</Link>
                    OR
                    <Link href="#" onClick={handleGuest} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Continue as Guest</Link>
                </p>
            </div>
        </div>
    );
}