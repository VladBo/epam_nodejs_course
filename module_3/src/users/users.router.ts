import express, { Request, Response } from "express";
import * as UsersService from "./users.service";
import { UserDto, UserCreateDto } from "./dto";

export const usersRouter = express.Router();

// GET items
usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users: UserDto[] = await UsersService.findAll();

    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// GET items/:id
usersRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const user: UserDto = await UsersService.find(id);
    if (user) {
      return res.status(200).send(user);
    }

    res.status(404).send("User is not found");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// POST items
usersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const user: UserCreateDto = req.body;
    const newUser = await UsersService.create(user);

    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// PUT users/:id
usersRouter.put("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const userUpdate: UserDto = req.body;
    const existingUser: UserDto = await UsersService.find(id);

    if (existingUser) {
      const updatedUser = await UsersService.update(id, userUpdate);
      return res.status(200).json(updatedUser);
    }
    const newItem = await UsersService.create(userUpdate);

    res.status(201).json(newItem);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// DELETE users/:id
usersRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await UsersService.remove(id);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
