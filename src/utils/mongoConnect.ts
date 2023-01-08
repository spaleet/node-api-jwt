import mongoose from "mongoose";
import logger from './logger';

async function connect() {
    const connectionString = process.env.MONGO_URL!;

    try {
        await mongoose.connect(connectionString);
        logger.info("Db Connected !");

    } catch (error) {
        logger.error("Db Connection Failed!", error);

        process.exit(1);
    }
}

export default connect;