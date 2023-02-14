import { IProductDocument, ProductModel, ProductInput } from '@models';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export async function findProduct(
    query: FilterQuery<IProductDocument>,
    options: QueryOptions = { lean: true }
) {
    return await ProductModel.findOne(query, {}, options);
}

export async function createProduct(input: ProductInput) {

    const result = await ProductModel.create(input);

    return result.toJSON();
}

export async function findAndUpdateProduct(
    query: FilterQuery<IProductDocument>,
    update: UpdateQuery<IProductDocument>,
    options: QueryOptions
) {
    return ProductModel.findOneAndUpdate(query, update, options);
}
