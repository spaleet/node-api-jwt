import jwt from 'jsonwebtoken'

export function createAccessToken(userData: Object): string {

    return jwt.sign(userData, process.env.PRIVATE_KEY!, {
        algorithm: "RS256",
        expiresIn: process.env.ACCESS_TOKEN_TTL ?? "15m"
    })
}

export function createRefreshToken(userData: Object): string {

    return jwt.sign(userData, process.env.PRIVATE_KEY!, {
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
        const decoded = jwt.verify(token, process.env.PUBLIC_KEY!);

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