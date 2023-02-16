import { signupHandler, signInHandler, logoutHandler, updateUserHandler } from '@controllers/auth.controller';
import { Router } from 'express';
import { validateResource, authorizeUser } from '@middleware';
import { signUpSchema, updateUserSchema, signInSchema } from '@schemas';

const router = Router();

router.post("/signup", validateResource(signUpSchema), signupHandler);

router.post("/signin", validateResource(signInSchema), signInHandler);
router.delete("/logout", authorizeUser, logoutHandler);

router.put("/user/:uid", [authorizeUser, validateResource(updateUserSchema)], updateUserHandler);

export default router;