import { SessionModel } from '@models';

const SessionService = {

    async createSession(userId: string, userAgent: string) {
        const session = await SessionModel.create({ user: userId, userAgent });

        return session.toJSON();
    }
}

export default SessionService