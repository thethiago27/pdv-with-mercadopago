import Mongo from "../database";

export async function getProductById(sku: string) {

    const mongo = new Mongo()
    const conn = await mongo.connection()
    const collection = conn?.collection('products')

    return await collection?.findOne({sku_number: sku})
}