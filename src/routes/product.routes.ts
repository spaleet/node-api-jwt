import { createProductHandler } from '@controllers/product.controller';
import { Router, Request, Response } from 'express';
import { authorizeUser, validateResource } from '@middleware';
import { createProductSchema } from '@schemas';

const router = Router();

router.post("", [authorizeUser, validateResource(createProductSchema)], createProductHandler);

export default router;