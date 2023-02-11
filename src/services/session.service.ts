import { SessionModel } from '@models';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { ISessionDocument } from '@models';
import { createAccessToken, verifyToken } from '@utils';
import { get } from 'lodash'
import { findUser } from '@services/user.service';

export async function findSessions(query: FilterQuery<ISessionDocument>) {

    return SessionModel.find(query)
        .lean(); // remove other methods on the object
}

export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();
}

export async function updateSession(sessionId: string, update: UpdateQuery<ISessionDocument>) {

    return SessionModel.updateOne({ _id: sessionId }, update);

}

export async function reIssueAccessToken(refreshToken: string): Promise<string | null> {

    const { decoded } = verifyToken(refreshToken)

    if (!decoded || !get(decoded, "_id")) {
        return null;
    }

    const session = await SessionModel.findById(get(decoded, "_id"));

    if (!session || !session.valid) {
        return null;
    }

    const user = await findUser({ _id: session.user });

    if (!user) return null;

    const accessToken = await createAccessToken({ ...user, session: session._id });

    return accessToken;
}