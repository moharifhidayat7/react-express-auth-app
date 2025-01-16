import "dotenv/config";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.ts";
import router from "./router.ts";

const app = express();

app.all("/api/auth/*", toNodeHandler(auth));
app.use("/api/", router);
app.use(express.json());

const PORT = process.env.PORT;

app
	.listen(PORT, () => {
		console.log("Server running at PORT: ", PORT);
	})
	.on("error", (error) => {
		throw new Error(error.message);
	});
