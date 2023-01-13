import { Request, Response } from "express";
import { validatePassword } from "@services/user.service";
import { createSession } from "@services/session.service";
import { signToken } from '../utils/jwt.util';

export async function createUserSessionHandler(req: Request, res: Response) {

    // validate user
    const user = await validatePassword(req.body)

    if (!user) {
        return res.status(401).send("Email or Password is incorrect!");
    }

    // create session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create access token
    const accessToken = await signToken(
        { ...user, session: session._id },
        {
            expiresIn: process.env.ACCESS_TOKEN_TTL! // 15 m
        });

    // create refresh token
    const refreshToken = await signToken(
        { ...user, session: session._id },
        {
            expiresIn: process.env.REFRESH_TOKEN_TTL! // 3 w
        });


    return res.send({ accessToken, refreshToken })
}