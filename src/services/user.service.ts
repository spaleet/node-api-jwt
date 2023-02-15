import { logger } from '@utils';
import { UserModel, IUserDocument, UpdateUserInputModel } from '@models';
import { omit } from 'lodash';
import { DocumentDefinition, FilterQuery, UpdateQuery } from 'mongoose';

export async function findUser(query: FilterQuery<IUserDocument>) {
    return UserModel.findOne(query).lean();
}

export async function createUser(input: DocumentDefinition<Omit<IUserDocument, "createdAt" | "updatedAt" | "comparePassword">>) {
    try {
        const user = await UserModel.create(input);

        return omit(user.toJSON(), "password")

    } catch (error: any) {
        logger.error(error);
    }
}

export async function updateUser(userId: string, updateData: UpdateUserInputModel) {
    try {
        const user = await UserModel.findOne({ _id: userId })
        const isValid = await user?.comparePassword(updateData.oldPassword);

        if (!isValid) throw new Error("Invalid Password");

        return await UserModel.findOneAndUpdate({ userId },
            {
                password: updateData.newPassword,
                email: updateData.email,
                username: updateData.username,
            }, { new: true });

    } catch (error: any) {
        logger.error(error);
    }
}

export async function validatePassword({ email, password }: { email: string, password: string }) {
    const user = await UserModel.findOne({ email })

    if (!user) return false;

    const isValid = await user.comparePassword(password);

    if (!isValid) return false;

    return omit(user.toJSON(), "password");
}