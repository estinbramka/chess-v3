'use client'
import signUp from '@/firebase/auth/signup';
import { useRouter } from 'next/navigation'
import React, { FormEvent } from "react";
import Image from 'next/image'
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';

export default function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordConfirm, setPasswordConfirm] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')
    const router = useRouter()
    const {user} = useAuthContext();
    
    if (user) {
        return router.push("/")
    }

    async function handleForm(event: FormEvent) {
        event.preventDefault()
        setErrorMessage('');

        if (password !== passwordConfirm) {
            setErrorMessage('Passwords do not match');
            return;
        }

        const { result, error } = await signUp(email, password);

        if (error) {
            switch (error.code) {
                case 'auth/weak-password':
                    setErrorMessage('Password should be at least 6 characters');
                    break;
                case 'auth/email-already-in-use':
                    setErrorMessage('Email already in use');
                    break;
                default:
                    setErrorMessage(error.message);
                    break;
            }
            return;
        }

        // else successful
        console.log(result)
        return router.push("/")
    }

    return (
        <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image className="mx-auto h-10 w-auto" src="/logo/chess-low-resolution-logo-color-on-transparent-background.png" alt="Your Company" width={1000} height={699} />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register a account</h2>
            </div>

            <div className={`alert alert-error mt-10 sm:mx-auto sm:w-full sm:max-w-sm ${errorMessage === '' && 'hidden'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{errorMessage}</span>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleForm} className="space-y-4" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-1">
                            <input onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-1">
                            <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password-confirm" className="block text-sm font-medium leading-6 text-gray-900">Password Confirmation</label>
                        </div>
                        <div className="mt-1">
                            <input onChange={(e) => setPasswordConfirm(e.target.value)} id="password-confirm" name="password-confirm" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have a account?
                    <Link href="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</Link>
                </p>
            </div>
        </div>
    );
}