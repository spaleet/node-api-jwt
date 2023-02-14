import { IProductDocument, ProductModel } from '@models';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { logger } from '@utils';
import { omit } from 'lodash';

export async function findProduct(
    query: FilterQuery<IProductDocument>,
    options: QueryOptions = { lean: true }
) {
    return await ProductModel.findOne(query, {}, options);
}

export async function createProduct(input: DocumentDefinition<Omit<IProductDocument, "createdAt" | "updatedAt">>) {

    try {
        const result = await ProductModel.create(input);

        return omit(result.toJSON(), "createdAt", "updatedAt", "__v", "user");
    } catch (error) {
        logger.error(error);
    }
}

export async function updateProduct(
    query: FilterQuery<IProductDocument>,
    update: UpdateQuery<IProductDocument>
) {
    try {

        const updatedResult = ProductModel.findOneAndUpdate(query, update, { new: true });

        return updatedResult;
    } catch (error) {
        logger.error(error);
    }
}

export async function deleteProduct(query: FilterQuery<IProductDocument>) {
    return ProductModel.deleteOne(query);
}