import { NextFunction, Request, Response } from "express";
import { validatePassword } from "@services/user.service";
import { createSession, findSessions, updateSession } from "@services/session.service";
import { createAccessToken, createRefreshToken, parseUserId } from '@utils';
import { CreateSessionInput } from "@schemas";

export async function getUserSessionsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = parseUserId(res);

        const sessions = await findSessions({ user: userId, valid: true })

        return res.send(sessions);
    } catch (error) {
        return next(error);
    }
}

export async function createSessionHandler(req: Request<{}, {}, CreateSessionInput["body"]>, res: Response, next: NextFunction) {

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

export async function deleteSessionHandler(req: Request, res: Response, next: NextFunction) {
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