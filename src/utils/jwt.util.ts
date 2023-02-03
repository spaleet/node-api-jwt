import jwt from 'jsonwebtoken'

const publicKey: string = `${process.env.PUBLIC_KEY}`;
const privateKey: string = `${process.env.PRIVATE_KEY}`;

export function createAccessToken(userData: Object): string {

    return jwt.sign(userData, privateKey, {
        algorithm: "RS256",
        expiresIn: process.env.ACCESS_TOKEN_TTL ?? "15m"
    })
}

export function createRefreshToken(userData: Object): string {

    return jwt.sign(userData, privateKey, {
        algorithm: "RS256",
        expiresIn: process.env.REFRESH_TOKEN_TTL ?? "3w"
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