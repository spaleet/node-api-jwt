import { Request, Response, NextFunction } from 'express';
import { parseUserId } from '@utils';
import { createUser, updateUser } from "@services/user.service";
import { CreateUserInput, UpdateUserInput } from '@schemas';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response, next: NextFunction) {
    try {
        const user = await createUser(req.body);

        return res.status(200).send(user);
    } catch (error) {
        return next(error);
    }
}

export async function updateUserHandler(req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>, res: Response, next: NextFunction) {
    try {
        const userId = parseUserId(res);

        const updatedUser = await updateUser(userId, req.body);

        return res.status(200).send(updatedUser);
    } catch (error) {
        return next(error);
    }
}