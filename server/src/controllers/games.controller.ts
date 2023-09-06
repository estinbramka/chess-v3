import type { Request, Response } from "express";


export const helloWorld = async (req: Request, res: Response) => {
    res.status(200).json({msg:"hello world from game controller"});
};
