import { SessionModel } from '@models';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { ISessionDocument } from '@models';
import { ApiError, createAccessToken, verifyToken } from '@utils';
import { get } from 'lodash'
import { findUser } from '@services/user.service';

export async function findSessions(query: FilterQuery<ISessionDocument>) {

    return SessionModel.find(query)
        .lean(); // remove other methods on the object
}

export async function createSession(userId: string, userAgent: string) {
    try {
        const session = await SessionModel.create({ user: userId, userAgent });

        return session.toJSON();
    } catch (error: any) {
        throw new ApiError(400, error.toString());
    }
}

export async function updateSession(sessionId: string, update: UpdateQuery<ISessionDocument>) {
    try {
        return SessionModel.updateOne({ _id: sessionId }, update);
    } catch (error: any) {
        throw new ApiError(400, error.toString());
    }
}

export async function reIssueAccessToken(refreshToken: string): Promise<string | null> {

    const verifyResult = verifyToken(refreshToken)
    const tokenDecoded = JSON.parse(verifyResult.decoded!);

    if (!tokenDecoded || !get(tokenDecoded, "session")) {
        throw new ApiError(400, "Invalid credentials!");
    }

    const session = await SessionModel.findById(get(tokenDecoded, "session"));

    if (!session || !session.valid) {
        throw new ApiError(400, "Invalid credentials!");
    }

    const user = await findUser({ _id: session.user });

    if (!user) {
        throw new ApiError(400, "Invalid credentials!");
    }

    const accessToken = createAccessToken({ ...user, session: session._id });

    return accessToken;
}