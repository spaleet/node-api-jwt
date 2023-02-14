import { Response } from "express";

export function parseUserId(res: Response): string {
    const localUser = JSON.parse(res.locals.user)
    const userId = localUser._id;

    if (!userId) throw Error("Couldn't parse the user id");

    return userId;
}