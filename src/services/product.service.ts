import { IProductDocument, ProductModel } from '@models';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export async function findProduct(
    query: FilterQuery<IProductDocument>,
    options: QueryOptions = { lean: true }
) {
    return await ProductModel.findOne(query, {}, options);
}

export async function createProduct(input: DocumentDefinition<Omit<IProductDocument, "createdAt" | "updatedAt">>) {

    const result = await ProductModel.create(input);

    return result.toJSON();
}

export async function updateProduct(
    query: FilterQuery<IProductDocument>,
    update: UpdateQuery<IProductDocument>,
    options: QueryOptions
) {
    return ProductModel.findOneAndUpdate(query, update, options);
}

export async function deleteProduct(query: FilterQuery<IProductDocument>) {
    return ProductModel.deleteOne(query);
}