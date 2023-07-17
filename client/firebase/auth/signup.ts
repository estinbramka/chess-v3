import firebase_app from "../config";
import { EmailAuthProvider, UserCredential, createUserWithEmailAndPassword, getAuth, linkWithCredential } from "firebase/auth";

const auth = getAuth(firebase_app);


export default async function signUp(email: string, password: string): Promise<{ result: UserCredential | null, error: any }> {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function signUpAnonymous(email: string, password: string): Promise<{ result: UserCredential | null, error: any }> {
    let result = null,
        error = null;
    try {
        const credential = EmailAuthProvider.credential(email, password);
        if (auth.currentUser !== null) {
            result = await linkWithCredential(auth.currentUser, credential);
        }else{
            error = 'Guest account not found'
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}