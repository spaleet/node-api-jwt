import { Request, Response } from "express";
import { logger } from '@utils';
import { createProduct } from "@services/product.service";
import { CreateProductInput } from '@schemas';

export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response) {

    try {
        const userId = res.locals.user._id;

        const body = req.body;
        const result = await createProduct({ ...body, user: userId });

        return res.status(200).send(result);

    } catch (error: any) {
        logger.error(error);
        return res.status(409).send(error.message);
    }
}