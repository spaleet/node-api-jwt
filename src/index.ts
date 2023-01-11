import express from 'express';
import dotenv from 'dotenv';
import { connect, logger } from '@utils';
import routes from './routes';

dotenv.config()

const app = express();

routes(app);

connect();

app.listen(process.env.PORT, () => {
    logger.info(`Running on http://localhost:${process.env.PORT}`);
})