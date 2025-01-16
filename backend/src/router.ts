import express from "express";

import { getUsers, getStats } from "./controllers/userController.ts";

const router = express.Router();

router.get("/users", getUsers);
router.get("/stats", getStats);

export default router;
