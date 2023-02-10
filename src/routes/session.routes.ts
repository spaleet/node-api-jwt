import { authorizeUser, validateResource } from '@middleware';
import { createSessionHandler, getUserSessionsHandler, deleteSessionHandler } from '@controllers/session.controller';
import { Router } from 'express';
import { createSessionSchema } from '@schemas';

const router = Router();

router.post("/new", validateResource(createSessionSchema), createSessionHandler);

router.get("", authorizeUser, getUserSessionsHandler);

router.delete("", authorizeUser, deleteSessionHandler);

export default router;