import { NextFunction, Request, Response } from "express";
import { findSessions } from "@services/session.service";
import { parseUserId } from '@utils';

export async function getUserSessionsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = parseUserId(res);

        const sessions = await findSessions({ user: userId, valid: true })

        return res.send(sessions);
    } catch (error) {
        return next(error);
    }
}