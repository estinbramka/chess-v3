import { API_URL } from "@/config";
import type { Game } from "@chessu/types";

export const createGame = async (side: string, unlisted: boolean, token: string) => {
    try {
        const res = await fetch(`${API_URL}/v1/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ side, unlisted }),
        });

        if (res && res.status === 201) {
            const game: Game = await res.json();
            return game;
        }
    } catch (err) {
        console.error(err);
    }
};

export const fetchActiveGame = async (code: string, token: string | undefined) => {
    try {
        const res = await fetch(`${API_URL}/v1/games/${code}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res && res.status === 200) {
            const game: Game = await res.json();
            return game;
        }
    } catch (err) {
        console.error(err);
    }
};

export const fetchPublicGames = async (token: string | undefined) => {
    try {
        const res = await fetch(`${API_URL}/v1/games`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res && res.status === 200) {
            const games: Game[] = await res.json();
            return games;
        }
    } catch (err) {
        console.error(err);
    }
};

export const fetchArchivedGame = async ({ id, userid }: { id?: number; userid?: number }) => {
    let url = `${API_URL}/v1/games?`;
    if (id) {
        url += `id=${id}`;
    } else {
        url += `userid=${userid}`;
    }
    try {
        // TODO: handle caching more efficiently
        const res = await fetch(url, {
            next: { revalidate: 20 }
        });

        if (res && res.status === 200) {
            if (id) {
                const game: Game = await res.json();
                if (game.id) return game;
            } else {
                const games: Game[] = await res.json();
                if (games.length && games[0].id) return games;
            }
        }
    } catch (err) {
        console.error(err);
    }
};