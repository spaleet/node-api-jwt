import { Request, Response } from "express";
import { logger, parseUserId } from '@utils';
import { createProduct, findProduct, updateProduct } from "@services/product.service";
import { CreateProductInput, UpdateProductInput } from '@schemas';

export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response) {

    try {
        const userId = parseUserId(res);

        const body = req.body;
        const result = await createProduct({ ...body, user: userId });

        return res.status(200).send(result);

    } catch (error: any) {
        logger.error(error);
        return res.status(409).send(error.message);
    }
}

export async function updateProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
    const userId = parseUserId(res);

    const productId = req.params.productId;
    const update = req.body;

    const product = await findProduct({ productId });

    if (!product) {
        return res.sendStatus(404);
    }

    if (String(product.user) !== userId) {
        return res.sendStatus(403);
    }

    const updatedProduct = await updateProduct({ productId }, update);

    return res.send(updatedProduct);
}