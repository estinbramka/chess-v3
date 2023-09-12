import type { NextFunction, Request, Response } from "express";

import admin from '../config/firebase-config.js';
class Middleware {
    async decodeToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        try {
            const decodeValue = await admin.auth().verifyIdToken(token!);
            if (decodeValue) {
                //console.log(decodeValue);
                req.user = decodeValue;
                return next();
            }
            return res.json({ message: 'Unauthorized' });
        } catch (e) {
            return res.json({ message: 'Internal Error' });
        }
    }
}
const middleware = new Middleware();

export default middleware;