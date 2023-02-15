import { createUserHandler, updateUserHandler } from '@controllers/user.controller';
import { Router, Request, Response } from 'express';
import { validateResource, authorizeUser } from '@middleware';
import { createUserSchema, updateUserSchema } from '@schemas';

const router = Router();

router.post("/register", validateResource(createUserSchema), createUserHandler);
router.put("/:uid", [authorizeUser, validateResource(updateUserSchema)], updateUserHandler);

export default router;