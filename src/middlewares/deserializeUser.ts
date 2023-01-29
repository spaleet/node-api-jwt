import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash'
import { VerifyJwtResponse, verifyToken } from '@utils';

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {

    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

    if (accessToken === "") {
        return next();
    }

    const verifyResult: VerifyJwtResponse = verifyToken(accessToken)

    if (verifyResult.decoded) {

        // store data in request/response cycle
        res.locals.user = verifyResult.decoded;
    }
}

export default deserializeUser;