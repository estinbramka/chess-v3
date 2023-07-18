import express, { Request, Response } from "express";
const app = express()
const PORT = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})