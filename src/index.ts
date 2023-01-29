import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect, logger } from '@utils';
import { userRouter, sessionRouter } from '@routes';
import { processUserData } from '@middlewares';

dotenv.config()

const app = express();
app.use(express.json())
app.use(processUserData);

connect();


app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionRouter);

app.listen(process.env.PORT, () => {
    logger.info(`Running on http://localhost:${process.env.PORT}`);
})