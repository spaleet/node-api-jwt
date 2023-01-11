import { createUserHandler } from '@controllers';
import { Router, Request, Response } from 'express';

const router = Router();

router.post("/register", async (req: Request, res: Response) => createUserHandler);

export default router;