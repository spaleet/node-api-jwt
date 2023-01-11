import { Request, Response } from "express";
import { logger } from '@utils';
import UserService from "@app/services/user.service";

export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await UserService.createUser(req.body)
    } catch (error: any) {
        logger.error(error);
        return res.status(409).send(error.message)
    }
}