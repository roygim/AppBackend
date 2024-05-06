import { Router } from "express";
import * as usersService from "../services/users.service";
import { CreateUser } from "../@types/dto";
import registerValidation from "./middleware/register.validation";

const usersRoute = Router()

usersRoute.get("/users", async (req, res) => {
    try {
        const users = await usersService.getAll()
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send('error');
    }
});

usersRoute.post("/register", registerValidation, async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const newUser: CreateUser = { firstname: firstname ?? '', lastname: lastname ?? '', email: email, password: password }
        console.log('newUser', newUser);
        res.status(201).send('ok');
        // const response = await usersService.register(newUser)

        // if (response.code == responseCode.USER_EXISTS) {
        //     res.status(400).send(responseStatus.USER_EXISTS);
        // } else {
        //     res.status(201).send(response);
        // }
    } catch (err) {
        // res.status(400).send(responseStatus.ERROR);
    }
});

export default usersRoute
