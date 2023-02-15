import { createProductHandler, updateProductHandler, deleteProductHandler } from '@controllers/product.controller';
import { Router, Request, Response } from 'express';
import { authorizeUser, validateResource } from '@middleware';
import { createProductSchema, updateProductSchema, deleteProductSchema } from '@schemas';

const router = Router();

router.post("", [authorizeUser, validateResource(createProductSchema)], createProductHandler);
router.put("/:productId", [authorizeUser, validateResource(updateProductSchema)], updateProductHandler);
router.delete("/:productId", [authorizeUser, validateResource(deleteProductSchema)], deleteProductHandler);

export default router;