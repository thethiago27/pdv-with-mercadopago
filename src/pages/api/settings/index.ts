import {NextApiRequest, NextApiResponse} from "next";
import Mongo from "../_lib/database";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const { method } = req

    if(method === "GET") {

        try {

            const mongo = new Mongo()

            const conn = await mongo.connection()

            await conn?.collection("settings").findOne({})

        } catch (e) {

        }

        return
    }

    res.status(405).json({
        statusCode: 405,
        message: "Method not allowed"
    })

}