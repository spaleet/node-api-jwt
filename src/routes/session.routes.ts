import { validateResource } from '@middlewares';
import { createSessionHandler, getUserSessionsHandler } from '@controllers';
import { Router } from 'express';
import { createSessionSchema } from '@schemas';

const router = Router();

router.post("/new", validateResource(createSessionSchema), createSessionHandler);

router.get("", getUserSessionsHandler);

export default router;