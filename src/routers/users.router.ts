import { Router } from "express";
import * as usersService from "../services/users.service";
import { CreateUser } from "../@types/dto";
import registerValidation from "./middleware/register.validation";

const usersRouter = Router()

usersRouter.get("/users", async (req, res) => {
    try {
        const users = await usersService.getAll()
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send('error');
    }
});

usersRouter.post("/register", registerValidation, async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const newUser: CreateUser = { firstname: firstname, lastname: lastname, email: email, password: password }
        
        const response = await usersService.register(newUser)
        
        if (!response.success) {
            res.status(400).send(response)
        } else {
            res.status(201).send(response.data?.toString());
        }
    } catch (err) {
        res.status(500).send('error');
    }
});

export default usersRouter
