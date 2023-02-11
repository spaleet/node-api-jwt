import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash'
import { verifyToken } from '@utils';
import { reIssueAccessToken } from '@services/session.service';

const processUserData = async (req: Request, res: Response, next: NextFunction) => {

    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken = get(req, "headers.x-refresh", "").toString();

    if (accessToken === "") {
        return next();
    }

    const verifyResult = verifyToken(accessToken)

    if (verifyResult.decoded) {

        // store data in request/response cycle
        res.locals.user = verifyResult.decoded;

        return next();
    }

    if (verifyResult.expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken(refreshToken);

        if (newAccessToken !== null) {
            res.setHeader("x-access-token", newAccessToken);

            const result = verifyToken(newAccessToken);

            res.locals.user = result.decoded;
        }

        return next();
    }

    return next();
}

export default processUserData;