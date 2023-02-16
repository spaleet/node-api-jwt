import { ApiError } from '@utils';
import { UserModel, IUserDocument, UpdateUserInputModel } from '@models';
import { omit } from 'lodash';
import { DocumentDefinition, FilterQuery } from 'mongoose';

export async function findUser(query: FilterQuery<IUserDocument>) {
    return UserModel.findOne(query).lean();
}

export async function createUser(input: DocumentDefinition<Omit<IUserDocument, "createdAt" | "updatedAt" | "comparePassword">>) {
    try {
        const user = await UserModel.create(input);

        return omit(user.toJSON(), "password")

    } catch (error: any) {
        throw new ApiError(400, error.toString());
    }
}

export async function updateUser(userId: string, updateData: UpdateUserInputModel) {

    try {
        const user = await UserModel.findOne({ _id: userId })

        if (!user)
            throw new ApiError(404, "User not found!");

        const isValid = await user?.comparePassword(updateData.oldPassword);

        if (!isValid)
            throw new ApiError(400, "Invalid Password");

        return await UserModel.findOneAndUpdate({ userId },
            {
                password: updateData.newPassword,
                email: updateData.email,
                username: updateData.username,
            }, { new: true });

    } catch (error: any) {
        throw new ApiError(400, error.toString());
    }
}

export async function validatePassword({ email, password }: { email: string, password: string }) {
    const user = await UserModel.findOne({ email })

    if (!user)
        throw new ApiError(404, "Email or Password is incorrect!");

    const isValid = await user.comparePassword(password);

    if (!isValid)
        throw new ApiError(400, "Invalid Password");

    return omit(user.toJSON(), "password");
}