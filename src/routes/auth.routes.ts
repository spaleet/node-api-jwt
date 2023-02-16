import { signupHandler, editUserHandler } from '@controllers/auth.controller';
import { Router } from 'express';
import { validateResource, authorizeUser } from '@middleware';
import { createUserSchema, updateUserSchema } from '@schemas';

const router = Router();

router.post("/signup", validateResource(createUserSchema), signupHandler);
router.put("/edit/:uid", [authorizeUser, validateResource(updateUserSchema)], editUserHandler);

export default router;