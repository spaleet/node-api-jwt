import { getProductHandler, createProductHandler, updateProductHandler, deleteProductHandler } from '@controllers/product.controller';
import { Router } from 'express';
import { authorizeUser, validateResource } from '@middleware';
import { getProductSchema, createProductSchema, updateProductSchema, deleteProductSchema } from '@schemas';

const router = Router();

router.get("/:productId", [authorizeUser, validateResource(getProductSchema)], getProductHandler);
router.post("", [authorizeUser, validateResource(createProductSchema)], createProductHandler);
router.put("/:productId", [authorizeUser, validateResource(updateProductSchema)], updateProductHandler);
router.delete("/:productId", [authorizeUser, validateResource(deleteProductSchema)], deleteProductHandler);

export default router;