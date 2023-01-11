import mongoose from "mongoose";
import { logger } from '@utils';

export function connect() {
    const connectionString = process.env.MONGO_URL!;

    mongoose.connect(connectionString)
        .then(() => {
            logger.info("Db Connected !");

        }).catch((error) => {
            logger.error("Db Connection Failed!", error);

            process.exit(1);
        });
}