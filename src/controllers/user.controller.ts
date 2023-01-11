import { Request, Response } from "express";
import { logger } from '@utils';
import { UserService } from "@services";
import { CreateUserInput } from '@schemas';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {

    try {
        const user = await UserService.createUser(req.body)
        return user;

    } catch (error: any) {
        logger.error(error);
        return res.status(409).send(error.message)
    }
}