import { Router } from "express";
import * as usersService from "../services/users.service";

const usersRoute = Router()

usersRoute.get("/users", async (req, res) => {
    try {
        const users = await usersService.getAll()
        res.status(200).send(users);
    } catch (err) {
        res.status(400).send('error');
    }
});

usersRoute.get("/users2", async (req, res) => {
    try {
        res.status(200).send('user ok2');
    } catch (err) {
        res.status(400).send('error');
    }
});

export default usersRoute
