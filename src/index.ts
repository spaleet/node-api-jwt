import express from 'express';
import dotenv from 'dotenv';
import connect from './utils/mongoConnect';

dotenv.config()

const app = express();

app.listen(process.env.PORT, async () => {
    console.log(`Running on http://localhost:${process.env.PORT}`);

    await connect();
})