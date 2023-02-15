import { IProductDocument, ProductModel } from '@models';
import { DocumentDefinition, FilterQuery, UpdateQuery } from 'mongoose';
import { logger } from '@utils';

export async function findProductById(productId: string) {
    return await ProductModel.findOne({ productId });
}

export async function createProduct(input: DocumentDefinition<Omit<IProductDocument, "createdAt" | "updatedAt" | "cleanResult">>) {

    try {
        return await ProductModel.create(input)
    } catch (error) {
        logger.error(error);
    }
}

export async function updateProduct(query: FilterQuery<IProductDocument>, update: UpdateQuery<IProductDocument>) {
    try {
        return await ProductModel.findOneAndUpdate(query, update, { new: true });
    } catch (error) {
        logger.error(error);
    }
}

export async function deleteProduct(query: FilterQuery<IProductDocument>) {
    try {
        return await ProductModel.deleteOne(query);
    } catch (error) {
        logger.error(error);
    }
}