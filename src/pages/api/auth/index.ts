import {NextApiRequest, NextApiResponse} from "next";
import jsonwebtoken from "jsonwebtoken";
import Mongo from "../_lib/database";


export default async function (req: NextApiRequest, res: NextApiResponse) {

    const {method} = req

    const mongo = new Mongo()

    if (method === 'POST') {

        const {username, password, pdvId} = req.body

        try {

            const conn = await mongo.connection()
            const collection = await conn?.collection('users')

            if (pdvId) {
                const user = await collection?.findOne({username, pdvId})

                if (user?.password === password) {

                    const token = jsonwebtoken.sign({
                        userId: user?.userId,
                        username: user?.username,
                        pdvId: user?.pdvId,
                    }, "aqui_tem_um_segredp", {
                        expiresIn: '1h'
                    })

                    return res.status(200).json({
                        status: 'success',
                        token,
                        permissions: "user.caixaPdv"
                    })
                }
                return res.status(401).json({
                    status: 'error',
                    message: 'Usuário ou senha inválidos'
                })
            }

            const user = await collection?.findOne({username})

            if (user?.password === password) {

                const token = jsonwebtoken.sign({
                    userId: user?.userId,
                    username: user?.username,
                    pdvId: user?.pdvId,
                }, "aqui_tem_um_segredp", {
                    expiresIn: '1h'
                })

                return res.status(200).json({
                    status: 'success',
                    token,
                    permissions: "user.admin"
                })
            }

            return res.status(401).json({
                status: 'error',
                message: 'Usuário ou senha inválidos'
            })
        } catch (e) {

            res.status(500).json({
                status: 'error',
                message: 'Erro interno do servidor'
            })

        }


    }

}