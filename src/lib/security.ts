import { JWTVerifyResult, KeyLike } from "jose";
import * as jose from "jose";

export async function verifyJWT(idCookie: string): Promise<JWTVerifyResult> {
    const rawPublicKey: string = (import.meta.env.VITE_JWT_PUBLIC_KEY as string) || "";
    const publicKey: KeyLike = await jose.importSPKI(rawPublicKey, "RS256");

    try {
        const { payload, protectedHeader }: JWTVerifyResult = await jose.jwtVerify(
            idCookie,
            publicKey,
            {
                issuer: "urn:sweep:issuer",
                audience: "urn:sweep:audience",
            },
        );

        return { payload, protectedHeader };
    } catch (error) {
        console.error(error);
        throw new Error("Unable to verify JWT");
    }
}

export function generateCSRFToken(): string {
    // TODO: is there a preferrable way to do this on the client?
    // TODO: should this responsibility be moved to the backend?
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
