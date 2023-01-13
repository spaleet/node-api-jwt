import { Request, Response } from "express";
import { logger } from '@utils';
import { UserService } from "@services";
import { CreateUserInput } from '@schemas';

export async function createUserSessionHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {

    // validate user
    const user = await UserService.validatePassword(req.body)

    if (!user) {
        return res.status(401).send("Email or Password is incorrect!");
    }

    // create session
}