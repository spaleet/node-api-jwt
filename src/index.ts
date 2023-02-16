import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { ApiError, connect, logger } from '@utils';
import { userRouter, sessionRouter, productRouter } from '@routes';
import { processUserData } from '@middleware';
import { NextFunction } from 'express';

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const app = express();
app.use(express.json())
app.use(processUserData);

// db connection
connect();

app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/products', productRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {

    logger.error(`ERROR: ${err.message}`);

    res.status(err.status).send(`ERROR: ${err.message}`);
});


app.listen(process.env.PORT, () => {
    logger.info(`Running on http://localhost:${process.env.PORT}`);
})