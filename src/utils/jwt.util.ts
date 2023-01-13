import jwt from 'jsonwebtoken'

const publicKey: string = `${process.env.PUBLIC_KEY}`;
const privateKey: string = `${process.env.PRIVATE_KEY}`;

export function signToken(object: Object, options?: jwt.SignOptions | undefined): string {

    return jwt.sign(object, privateKey, {
        ...(options && options), // check if undefined
        algorithm: "RS256"
    })
}

export type VerifyJwtResponse = {
    valid: boolean,
    expired: boolean,
    decoded: string | null
}

export function verifyToken(token: string): VerifyJwtResponse {
    try {
        const decoded = jwt.verify(token, publicKey);

        return {
            valid: true,
            expired: false,
            decoded: decoded.toString()
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}