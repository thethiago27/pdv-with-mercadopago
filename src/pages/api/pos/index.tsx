import {NextApiRequest, NextApiResponse} from "next";
import {getTokenFromHeader, getUserId} from "../_lib/token";
import {api} from "../_lib/services/api";
import Mongo from "../_lib/database";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const { method } = req

    const mongo = new Mongo()
    const conn = await mongo.connection()

    if (method === 'POST') {

        const { name, fixed_amount, store_id, external_store_id, external_id, category } = req.body

        try {

            const collection = await conn?.collection('pos')

            const token = await getTokenFromHeader(String(req.headers.authorization))
            const userId = await getUserId(token)

            const response = await api.post(`/pos`, {
                name,
                fixed_amount,
                store_id,
                external_store_id,
                external_id,
                category
            })

            const {
                id,
                qr,
                status,
                date_created,
                user_id,
                date_last_updated,
                uuid,
            } = response.data


            await collection?.insertOne({
                id,
                qr,
                status,
                date_created,
                date_last_updated,
                uuid,
                userId,
                name,
                fixed_amount,
                store_id,
                external_store_id,
                external_id,
                mp_id: user_id,
                category
            })

            return res.status(200).json({
                status: true,
                message: 'Successfully created POS',
            })

        } catch (e: any) {
            return res.status(500).json({
                status: false,
                message: 'Failed to create POS',
                error: e.message
            })
        }

    } else if (method === "GET") {

        try {

            // Get all POS from database[
            const collection = await conn?.collection('pos')
            const pos = await collection?.find({}).toArray()

            return res.status(200).json({
                status: true,
                message: 'Successfully fetched POS',
                pos
            })

        } catch (e: any) {

            return res.status(401).json({
                status: false,
                message: 'Failed to fetch POS',
                error: e.message
            })
        }
    }


}