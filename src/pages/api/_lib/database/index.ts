import { MongoClient } from 'mongodb';

class Mongo {

    async connection() {

        const conn = new MongoClient("mongodb://localhost:27017/mercadopago");

        try {
            await conn.connect();

            return conn.db(process.env.MONGO_DB);
        } catch (err) {
            console.error(err);
        }

    }

}

export default Mongo