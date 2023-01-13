import { Request, Response } from "express";
import { omit } from "lodash";
import { logger } from '@utils';
import { createUser } from "@services/user.service";
import { CreateUserInput } from '@schemas';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {

    try {
        const user = await createUser(req.body);

        const jsonResult = omit(user.toJSON(), "password")

        return res.status(200).send(jsonResult);

    } catch (error: any) {
        logger.error(error);
        return res.status(409).send(error.message);
    }
}