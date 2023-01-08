import express from 'express';
import dotenv from 'dotenv';
import connect from './utils/mongoConnect';
import logger from './utils/logger';

dotenv.config()

const app = express();

app.listen(process.env.PORT, async () => {
    logger.info(`Running on http://localhost:${process.env.PORT}`);

    await connect();
})