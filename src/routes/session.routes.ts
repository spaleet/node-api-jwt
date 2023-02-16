import { authorizeUser } from '@middleware';
import { getUserSessionsHandler } from '@controllers/session.controller';
import { Router } from 'express';

const router = Router();

router.get("", authorizeUser, getUserSessionsHandler);

export default router;