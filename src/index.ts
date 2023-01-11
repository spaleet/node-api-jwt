import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect, logger } from '@utils';
import userRouter from '@app/routes/user.routes';

dotenv.config()

const app = express();

connect();

app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
app.use('/api/users', userRouter);

app.listen(process.env.PORT, () => {
    logger.info(`Running on http://localhost:${process.env.PORT}`);
})