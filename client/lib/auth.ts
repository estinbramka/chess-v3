import { API_URL } from "@/config";
import type { User } from "@chessu/types";

export const fetchSession = async (token: string | undefined) => {
    try {
        const res = await fetch(`${API_URL}/v1/auth`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (res && res.status === 200) {
            const user: User = await res.json();
            return user;
        }
    } catch (err) {
        // do nothing
    }
};

export const setGuestSession = async (name: string) => {
    try {
        const res = await fetch(`${API_URL}/v1/auth/guest`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        });
        if (res.status === 201) {
            const user: User = await res.json();
            return user;
        }
    } catch (err) {
        console.error(err);
    }
};

export const register = async (name: string, token: string | undefined) => {
    try {
        const res = await fetch(`${API_URL}/v1/auth/register`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        });
        if (res.status === 201) {
            const user: User = await res.json();
            return user;
        } else if (res.status === 409) {
            const { message } = await res.json();
            return message as string;
        }
    } catch (err) {
        console.error(err);
    }
};

export const login = async (name: string, password: string) => {
    try {
        const res = await fetch(`${API_URL}/v1/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, password })
        });
        if (res.status === 200) {
            const user: User = await res.json();
            return user;
        } else if (res.status === 404 || res.status === 401) {
            const { message } = await res.json();
            return message as string;
        }
    } catch (err) {
        console.error(err);
    }
};

export const logout = async () => {
    try {
        const res = await fetch(`${API_URL}/v1/auth/logout`, {
            method: "POST",
            credentials: "include"
        });
        if (res.status === 204) {
            return true;
        }
    } catch (err) {
        console.error(err);
    }
};

export const updateUser = async (name?: string, email?: string | null, token?: string) => {
    try {
        if (!name && !email && !token) return;
        const res = await fetch(`${API_URL}/v1/auth/`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email })
        });
        if (res.status === 200) {
            const user: User = await res.json();
            return user;
        } else if (res.status === 409) {
            const { message } = await res.json();
            return message as string;
        }
    } catch (err) {
        console.error(err);
    }
};