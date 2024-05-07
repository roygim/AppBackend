import { Router } from "express";
import * as usersService from "../services/users.service";
import { CreateUser, UpdateUser } from "../types/dto";
import registerValidation from "./middleware/register.validation";
import { ErrorType } from "../types";
import { tokenValidation } from "./middleware/token.validation";

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

usersRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await usersService.login(email, password)
        console.log(response)
        if(!response.success) {
            if(response.error == ErrorType.UserNotFound) {
                res.status(404).send('user not found')
            }
            else if(response.error == ErrorType.InvalidPassword) {
                res.status(400).send('invalid password')
            } 
        } else {
            res.cookie('userToken', response.data.accessToken, { httpOnly: true })
            res.status(200).send(response.data.user)            
        }
    } catch (err) {
        res.status(500).send('error');
    }
});

usersRouter.post("/loaduser", tokenValidation, async (req: any, res: any) => {
    try {
        const id = req.userId
        const response = await usersService.getUserById(id)
        res.status(200).send(response)
    } catch (err) {
        res.status(500).send('error');
    }
});

usersRouter.put("/users/update", tokenValidation, async (req: any, res: any) => {
    try {
        const { firstname, lastname } = req.body
        const id = req.userId
        const updateUser: UpdateUser = {
            firstname: firstname,
            lastname: lastname
        }

        const response = await usersService.update(id, updateUser)

        res.status(200).send(response)
    } catch (err) {
        res.status(500).send('error');
    }
});

usersRouter.delete("/users/delete", tokenValidation, async (req: any, res: any) => {
    try {
        const id = req.userId
        
        const response = await usersService.deleteUser(id)

        res.status(200).send(response)
    } catch (err) {
        res.status(500).send('error');
    }
});

export default usersRouter
