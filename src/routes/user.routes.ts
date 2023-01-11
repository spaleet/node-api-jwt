import { createUserHandler } from '@controllers';
import { Router, Request, Response } from 'express';
import { validateResource } from '@middlewares';
import { createUserSchema } from '@schemas';

const router = Router();

router.post("/register", validateResource(createUserSchema), createUserHandler);

export default router;