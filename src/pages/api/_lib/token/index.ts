import {NextApiRequest} from "next";
import {verify} from "jsonwebtoken";

export async function getTokenFromHeader(authorization: string): Promise<string> {


    if (!authorization) {
        throw new Error("No token provided");
    }

    if (!authorization.startsWith("Bearer ")) {
        throw new Error("Invalid token");
    }

    return authorization.split(" ")[1];

}

export async function getUserId(token: string): Promise<string> {
    const payload = verify(token, "aqui_tem_um_segredp") as any;

    return payload.userId;
}