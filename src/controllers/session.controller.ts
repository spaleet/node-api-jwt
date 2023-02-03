import { Request, Response } from "express";
import { validatePassword } from "@services/user.service";
import { createSession, findSessions } from "@services/session.service";
import { createAccessToken, createRefreshToken } from '@utils';
import { CreateSessionInput } from "@schemas";

export async function getUserSessionsHandler(req: Request, res: Response) {

    const userId = res.locals.user._id;

    const sessions = await findSessions({ user: userId, valid: true })

    return res.send(sessions);
}

export async function createSessionHandler(req: Request<{}, {}, CreateSessionInput["body"]>, res: Response) {

    // validate user
    const user = await validatePassword(req.body)

    if (!user) {
        return res.status(401).send("Email or Password is incorrect!");
    }

    // create session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create access token
    const accessToken = await createAccessToken({ ...user, session: session._id });

    // create refresh token
    const refreshToken = await createRefreshToken({ ...user, session: session._id });

    return res.send({ accessToken, refreshToken })
}