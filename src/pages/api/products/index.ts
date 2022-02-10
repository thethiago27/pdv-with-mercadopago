import {NextApiRequest, NextApiResponse} from "next";
import Mongo from "../_lib/database";
import {getTokenFromHeader, getUserId} from "../_lib/token";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const { method } = req

    if (method === "POST") {

        try {

            const mongo = new Mongo()
            const conn = await mongo.connection()

            const collection = conn?.collection("products")

            const {
                title,
                description,
                unit_price,
                quantity,
                total_amount,
                image_url,
                store_id
            } = req.body

            const token = await getTokenFromHeader(String(req.headers.authorization))
            const userId = await getUserId(token)

            const orderId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

            await collection?.insertOne({
                sku_number: orderId,
                category: "marketplace",
                title,
                description,
                unit_price,
                quantity,
                unit_measure: "unit",
                total_amount,
                image_url,
                store_id,
                userId
            })

           return res.status(200).json({
                message: "Product created successfully"
            })
        } catch (e) {
            return res.status(500).json({
                message: "Internal server error"
            })
        }

    }

}