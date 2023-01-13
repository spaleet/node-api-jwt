import { validateResource } from '@middlewares';
import { createSessionHandler } from '@controllers';
import { Router } from 'express';
import { createSessionSchema } from '@schemas';

const router = Router();

router.post("/new", validateResource(createSessionSchema), createSessionHandler);

export default router;