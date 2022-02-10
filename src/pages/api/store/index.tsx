import Mongo from "../_lib/database";
import {NextApiRequest, NextApiResponse} from "next";
import {api} from "../_lib/services/api";
import {getTokenFromHeader, getUserId} from "../_lib/token";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const {method} = req

    const mongo = new Mongo()

    if (method === "POST") {

        const {business_hours, location, external_id, name} = req.body

        try {

            const token = await getTokenFromHeader(String(req.headers.authorization))
            const userId = await getUserId(token)

            const response = await api.post(`users/342521484/stores`, {
                business_hours,
                location,
                external_id,
                name
            })

            const { id } = response.data

            const conn = await mongo.connection()

            const collection = await conn?.collection("stores")

            await collection?.insertOne({
                business_hours,
                location,
                external_id,
                name,
                userId,
                store_id: id
            })

            return res.status(200).json({
                status: true,
                message: "Store created successfully",
                data: response.data
            })
        } catch (e) {
            return res.status(500).json({
                status: false,
                message: "Error creating store",
                error: e
            })

        }
    }

    return res.status(405).json({
        statusCode: 405,
        message: "Method not allowed"
    })
}