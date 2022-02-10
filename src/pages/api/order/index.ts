import {NextApiRequest, NextApiResponse} from "next";
import {getProductById} from "../_lib/product";
import {api} from "../_lib/services/api";

type Items = {
    sku: string;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const {method} = req

    if (method === "POST") {

       try {
           const {items, title, external_store_id, external_pos_id} = req.body

           const products = await Promise.all(items.map(async (item: Items) => {
               const product: any = await getProductById(item.sku)

               return {
                   sku_number: product.sku_number,
                   category: product.category,
                   title: product.title,
                   description: product.description,
                   unit_measure: product.unit_measure,
                   unit_price: product.total_amount,
                   total_amount: product.total_amount,
                   quantity: 1
               }
           }))


           // Sum up the total price of all products
           const totalPrice = products.reduce((total: number, product: any) => {
               return total + product.total_amount
           }, 0)

           // Create random order id with number
           const orderId = Math.floor(Math.random() * 1000000)

           const sender = {
               external_reference: String(orderId),
               title,
               description: "Pedido 2 pagar agora",
               sponsor: {
                   id: 342521484
               },
               notification_url: "https://teste.com/api/order/notification",
               items: products,
               total_amount: totalPrice,
           }

           console.log(sender)

           await api.put(`instore/qr/seller/collectors/342521484/stores/${external_store_id}/pos/${external_pos_id}/orders`, sender)

           return res.status(200).json({
               status: "success",
               message: "Order created, please scan the QR code",
           })
       } catch (e) {
           return res.status(500).json({
               status: "error",
               message: "Something went wrong",
           })
       }

    }

}