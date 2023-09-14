import { useAuthContext } from "@/context/AuthContext";
import { fetchSession, register } from "@/lib/auth";
import React from "react";
import { FormEvent } from "react";

export default function AuthModal() {
    const { user } = useAuthContext();
    const modalRef = React.useRef<any>(null)
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchData() {
            const userdb = await fetchSession(await user?.getIdToken())
            if (userdb?.name === undefined) {
                modalRef.current.showModal();
            }
        }
        fetchData();
    }, [])

    async function registerName(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const target = e.target as HTMLFormElement;
        const registerName = target.elements.namedItem("registerName") as HTMLInputElement;
        if (!registerName || !registerName.value) {
            return;
        }
        const userdb = await register(
            registerName.value,
            await user?.getIdToken()
        );
        if (typeof userdb === 'string') {
            console.log(userdb);
            setError(userdb);
        }
        else {
            modalRef.current.close();
        }
    }

    return (
        <>
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    {error &&
                        <div className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{error}</span>
                        </div>
                    }
                    <form onSubmit={registerName}>
                        <div className="form-control">
                            <label htmlFor="registerName" className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                pattern="[A-Za-z0-9]+"
                                title="Alphanumeric characters only"
                                id="registerName"
                                name="registerName"
                                placeholder="username"
                                className="input input-bordered"
                                maxLength={16}
                                minLength={2}
                                required
                            />
                        </div>
                        <div className="modal-action">
                            <button className="btn" type="submit">submit</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}