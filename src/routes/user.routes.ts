import { createUserHandler } from '@app/controllers/user.controller';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => createUserHandler);

export default router;