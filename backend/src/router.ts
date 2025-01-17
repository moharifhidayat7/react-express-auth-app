import express from "express";

import {
	getUsers,
	getStats,
	getOneUser,
	updateUser,
} from "./controllers/userController.ts";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getOneUser);
router.post("/users", updateUser);
router.get("/stats", getStats);

export default router;
