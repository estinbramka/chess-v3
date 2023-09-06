import type { Request, Response } from "express";

export const helloWorld = async (req: Request, res: Response) => {
    console.log(req.user,'helloe world');
    res.status(200).json({msg:"hello world from game controller"});
};
