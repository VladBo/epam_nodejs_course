import express, { Express } from "express";
import dotenv from "dotenv";
import { usersRouter } from "./users/users.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const port: number = parseInt(process.env.PORT as string, 10);
const app: Express = express();

app.use(express.json());
app.use("/api/users", usersRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
