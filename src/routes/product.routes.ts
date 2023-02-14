import { createProductHandler, updateProductHandler } from '@controllers/product.controller';
import { Router, Request, Response } from 'express';
import { authorizeUser, validateResource } from '@middleware';
import { createProductSchema, updateProductSchema } from '@schemas';

const router = Router();

router.post("", [authorizeUser, validateResource(createProductSchema)], createProductHandler);
router.put("/:productId", [authorizeUser, validateResource(updateProductSchema)], updateProductHandler);

export default router;