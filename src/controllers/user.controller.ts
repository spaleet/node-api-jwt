import { Request, Response } from "express";
import { logger, parseUserId } from '@utils';
import { createUser, updateUser } from "@services/user.service";
import { CreateUserInput, UpdateUserInput } from '@schemas';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {

    try {
        const user = await createUser(req.body);

        return res.status(200).send(user);

    } catch (error: any) {
        logger.error(error);
        return res.status(409).send(error.message);
    }
}

export async function updateUserHandler(req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>, res: Response) {

    try {
        const userId = parseUserId(res);

        const updatedUser = await updateUser(userId, req.body);

        return res.status(200).send(updatedUser);

    } catch (error: any) {
        logger.error(error);
        return res.status(409).send(error.message);
    }
}