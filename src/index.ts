import express from 'express';
import dotenv from 'dotenv';
import { connect, logger } from '@utils';

dotenv.config()

const app = express();

app.listen(process.env.PORT, async () => {
    logger.info(`Running on http://localhost:${process.env.PORT}`);

    await connect();
})