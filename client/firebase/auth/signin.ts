import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth, UserCredential, signInAnonymously, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email: string, password: string): Promise<{ result: UserCredential | null, error: any }> {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e ;
    }

    return { result, error };
}

export async function signInAnonymous() {
    let result = null,
        error = null;
    try {
        result = await signInAnonymously(auth);
    } catch (e) {
        error = e ;
    }

    return { result, error };
}

export async function signInGoogle() {
    const provider = new GoogleAuthProvider();
    let result = null,
        error = null;
    try {
        result = await signInWithPopup(auth, provider);
    } catch (e) {
        error = e ;
    }

    return { result, error };
}