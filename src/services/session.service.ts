import { SessionModel } from '@models';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { ISessionDocument } from '../models/session.model';
import { verifyToken } from '@utils';
import { get } from 'lodash'

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

export async function reIssueAccessToken(refreshToken: string): Promise<string> {

    const { decoded } = verifyToken(refreshToken)

    if (!decoded || !get(decoded, "_id")) {
        return "";
    }

    const session = await SessionModel.findById(get(decoded, "_id"));

    if (!session || !session.valid) {
        return "";
    }


}