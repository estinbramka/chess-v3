import { Router } from "express";

import games from "./games.route.js";
//import users from "./users.route.js";

const router = Router();

router.use("/games", games);
//router.use("/users", users);

export default router;