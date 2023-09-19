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

        if (req.user.email === undefined) {
            req.user.email = null;
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

export const updateUser = async (req: Request, res: Response) => {
    try {
        if (!req.user?.uid) {
            res.status(403).end();
            return;
        }

        const userdb = await UserModel.findById(req.user?.uid);
        if(!userdb) return;

        if (!req.body.name && !req.body.email) {
            res.status(400).end();
            return;
        }

        const name = xss(req.body.name || userdb.name);
        const pattern = /^[A-Za-z0-9]+$/;
        if (!pattern.test(name)) {
            res.status(400).end();
            return;
        }

        const email = xss(req.body.email || userdb.email);
        const compareEmail = email || name;

        const duplicateUsers = await UserModel.findByNameEmail({ name, email: compareEmail });
        if (
            duplicateUsers &&
            duplicateUsers.length &&
            duplicateUsers[0].id !== req.user.uid
        ) {
            const dupl = duplicateUsers[0].name === name ? "Username" : "Email";
            res.status(409).json({ message: `${dupl} is already in use.` });
            return;
        }

        const updatedUser = await UserModel.update(req.user.uid, { name, email });

        if (!updatedUser) {
            throw new Error("Failed to update user");
        }
    } catch (err: unknown) {
        console.log(err);
        res.status(500).end();
    }
};