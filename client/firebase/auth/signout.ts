import { getAuth, signOut as signOutFireBase } from "firebase/auth";
import firebase_app from "../config";

const auth = getAuth(firebase_app);

export default async function signOut() {
    let result = null,
        error = null;
    try {
        await signOutFireBase(auth);
        result = 'sign out successfull'
    } catch (e) {
        error = e ;
    }

    return { result, error };
}