import { NextFunction, Request, Response } from "express";
import { logger, parseUserId } from '@utils';
import { createProduct, deleteProduct, findProductById, updateProduct } from "@services/product.service";
import { GetProductInput, CreateProductInput, UpdateProductInput, DeleteProductInput } from '@schemas';
import { omit } from "lodash";

const cleanProductResult = (product: any) => {
    return omit(product.toJSON(), "createdAt", "updatedAt", "__v", "user")
}

export async function getProductHandler(req: Request<GetProductInput["params"]>, res: Response) {

    const productId = req.params.productId;

    const product = await findProductById(productId);

    if (!product) {
        return res.sendStatus(404);
    }

    return res.send(cleanProductResult(product));
}

export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response, next: NextFunction) {

    try {
        const userId = parseUserId(res);

        const body = req.body;
        const result = await createProduct({ ...body, user: userId });

        return res.status(200)
            .send(cleanProductResult(result));

    } catch (error) {
        return next(error);
    }
}

export async function updateProductHandler(req: Request<UpdateProductInput["params"]>, res: Response, next: NextFunction) {

    try {
        const userId = parseUserId(res);

        const productId = req.params.productId;
        const update = req.body;

        const product = await findProductById(productId);

        if (!product) {
            return res.sendStatus(404);
        }

        if (String(product.user) !== userId) {
            return res.sendStatus(403);
        }

        const updatedProduct = await updateProduct({ productId }, update);

        return res.send(cleanProductResult(updatedProduct));
    } catch (error) {
        return next(error);
    }

}

export async function deleteProductHandler(req: Request<DeleteProductInput["params"]>, res: Response, next: NextFunction) {

    try {
        const userId = parseUserId(res);
        const productId = req.params.productId;

        const product = await findProductById(productId);

        if (!product) {
            return res.sendStatus(404);
        }

        if (String(product.user) !== userId) {
            return res.sendStatus(403);
        }

        await deleteProduct({ productId });

        return res.sendStatus(200);
    } catch (error) {
        return next(error);
    }

}