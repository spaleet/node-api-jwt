import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect, logger } from '@utils';
import { userRouter, sessionRouter, productRouter } from '@routes';
import { processUserData } from '@middleware';

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const app = express();
app.use(express.json())
app.use(processUserData);

connect();


app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/products', productRouter);

app.listen(process.env.PORT, () => {
    logger.info(`Running on http://localhost:${process.env.PORT}`);
})