import type { User } from "@chessu/types";
import type { Request, Response } from "express";
import xss from "xss";

import { activeGames } from "../db/models/game.model.js";
import UserModel from "../db/models/user.model.js";
//import { io } from "../server.js";

export const getCurrentSession = async (req: Request, res: Response) => {
    try {
        if (req.user) {
            res.status(200).json(await UserModel.findById(req.user.uid));
        } else {
            res.status(204).end();
        }
    } catch (err: unknown) {
        console.log(err);
        res.status(500).end();
    }
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        if (req.user?.uid === undefined) {
            res.status(403).end();
            return;
        }

        const name = xss(req.body.name);

        const pattern = /^[A-Za-z0-9]+$/;

        if (!pattern.test(name)) {
            res.status(400).end();
            return;
        }

        const compareEmail = req.user.email || name;
        const duplicateUsers = await UserModel.findByNameEmail({ name, email: compareEmail });
        if (duplicateUsers && duplicateUsers.length) {
            const dupl = duplicateUsers[0].name === name ? "Username" : "Email";
            res.status(409).json({ message: `${dupl} is already in use.` });
            return;
        }

        const newUser = await UserModel.create({ name, email : req.user.email }, req.user.uid);
        if (!newUser) {
            throw new Error("Failed to create user");
        }

        res.status(201).json(newUser);
    } catch (err: unknown) {
        console.log(err);
        res.status(500).end();
    }
};
/*
export const updateUser = async (req: Request, res: Response) => {
    try {
        if (!req.session.user?.id || typeof req.session.user.id === "string") {
            res.status(403).end();
            return;
        }

        if (!req.body.name && !req.body.email && !req.body.password) {
            res.status(400).end();
            return;
        }

        const name = xss(req.body.name || req.session.user.name);
        const pattern = /^[A-Za-z0-9]+$/;
        if (!pattern.test(name)) {
            res.status(400).end();
            return;
        }

        const email = xss(req.body.email || req.session.user.email);
        const compareEmail = email || name;

        const duplicateUsers = await UserModel.findByNameEmail({ name, email: compareEmail });
        if (
            duplicateUsers &&
            duplicateUsers.length &&
            duplicateUsers[0].id !== req.session.user.id
        ) {
            const dupl = duplicateUsers[0].name === name ? "Username" : "Email";
            res.status(409).json({ message: `${dupl} is already in use.` });
            return;
        }

        let password: string | undefined = undefined;
        if (req.body.password) {
            password = await hash(req.body.password);
        }

        const updatedUser = await UserModel.update(req.session.user.id, { name, email, password });

        if (!updatedUser) {
            throw new Error("Failed to update user");
        }

        const publicUser = {
            id: updatedUser.id,
            name: updatedUser.name
        };

        const game = activeGames.find(
            (g) =>
                g.white?.id === req.session.user.id ||
                g.black?.id === req.session.user.id ||
                g.observers?.find((o) => o.id === req.session.user.id)
        );
        if (game) {
            if (game.host?.id === req.session.user.id) {
                game.host = publicUser;
            }
            if (game.white && game.white?.id === req.session.user.id) {
                game.white = publicUser;
            } else if (game.black && game.black?.id === req.session.user.id) {
                game.black = publicUser;
            } else {
                const observer = game.observers?.find((o) => o.id === req.session.user.id);
                if (observer) {
                    observer.id = publicUser.id;
                    observer.name = publicUser.name;
                }
            }
            io.to(game.code as string).emit("receivedLatestGame", game);
        }

        req.session.user = updatedUser;
        req.session.save(() => {
            res.status(200).json(req.session.user);
        });
    } catch (err: unknown) {
        console.log(err);
        res.status(500).end();
    }
};
*/