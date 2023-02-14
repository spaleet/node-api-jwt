import { IProductDocument, ProductModel } from '@models';
import { FilterQuery, QueryOptions } from 'mongoose';

export async function findProduct(
    query: FilterQuery<IProductDocument>,
    options: QueryOptions = { lean: true }
) {
    return await ProductModel.findOne(query, {}, options);
}
