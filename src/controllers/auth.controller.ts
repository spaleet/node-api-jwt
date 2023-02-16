import { Request, Response, NextFunction } from 'express';
import { createUser, updateUser } from "@services/user.service";
import { SignUpInput, UpdateUserInput } from '@schemas';
import { validatePassword } from "@services/user.service";
import { createSession, updateSession } from "@services/session.service";
import { createAccessToken, createRefreshToken, parseUserId } from '@utils';
import { SignInInput } from "@schemas";

// register new user user
export async function signupHandler(req: Request<{}, {}, SignUpInput["body"]>, res: Response, next: NextFunction) {
    try {
        const user = await createUser(req.body);

        return res.status(200).send(user);
    } catch (error) {
        return next(error);
    }
}

// create jwt tokens
export async function signInHandler(req: Request<{}, {}, SignInInput["body"]>, res: Response, next: NextFunction) {

    try {
        // validate user
        const user = await validatePassword(req.body)

        // create session
        const session = await createSession(user._id, req.get("user-agent") || "");

        // create access token
        const accessToken = createAccessToken({ ...user, session: session._id });

        // create refresh token
        const refreshToken = createRefreshToken({ ...user, session: session._id });

        return res.send({ accessToken, refreshToken })
    } catch (error) {
        return next(error);
    }

}

// revoke tokens & return null tokens
export async function logoutHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const localUser = JSON.parse(res.locals.user)
        const sessionId = localUser.session;

        await updateSession(sessionId, { valid: false })

        return res.send({
            accessToken: null,
            refreshToken: null,
        });
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