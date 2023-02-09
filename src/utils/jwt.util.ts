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
    console.log("here");

    try {
        const decoded = jwt.verify(token, process.env.PUBLIC_KEY!);
        console.log("here23");

        return {
            valid: true,
            expired: false,
            decoded: decoded.toString()
        }
    } catch (error: any) {
        console.log("here error", error);

        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}