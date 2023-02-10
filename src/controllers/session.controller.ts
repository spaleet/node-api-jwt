import { Request, Response } from "express";
import { validatePassword } from "@services/user.service";
import { createSession, findSessions, updateSession } from "@services/session.service";
import { createAccessToken, createRefreshToken } from '@utils';
import { CreateSessionInput } from "@schemas";

export async function getUserSessionsHandler(req: Request, res: Response) {

    const localUser = JSON.parse(res.locals.user)
    const userId = localUser._id;

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

export async function deleteSessionHandler(req: Request, res: Response) {

    const localUser = JSON.parse(res.locals.user)
    const sessionId = localUser.session;

    await updateSession(sessionId, { valid: false })

    return res.send({
        accessToken: null,
        refreshToken: null,
    })
}