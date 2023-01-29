import { SessionModel } from '@models';
import { FilterQuery } from 'mongoose';
import { ISessionDocument } from '../models/session.model';

export async function findSessions(query: FilterQuery<ISessionDocument>) {

    return SessionModel.find(query)
        .lean(); // remove other methods on the object
}

export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();
}