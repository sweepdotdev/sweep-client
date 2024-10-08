import { JWTVerifyResult, KeyLike } from "jose";
import * as jose from "jose";

export default async function verifyJWT(idCookie: string): Promise<JWTVerifyResult> {
    const rawPublicKey: string = (import.meta.env.VITE_JWT_SECRET_KEY as string) || "";
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
