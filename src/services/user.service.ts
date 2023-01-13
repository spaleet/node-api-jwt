import { UserModel, IUserDocument } from '@models';
import { omit } from 'lodash';
import { DocumentDefinition } from 'mongoose';

const UserService = {

    async createUser(input: DocumentDefinition<Omit<IUserDocument, "createdAt" | "updatedAt" | "comparePassword">>) {
        try {
            const user = await UserModel.create(input);

            return omit(user.toJSON(), "password")

        } catch (error: any) {
            throw new Error(error)
        }
    },

    async validatePassword({ email, password }: { email: string, password: string }) {
        const user = await UserModel.findOne({ email })

        if (!user) return false;

        const isValid = await user.comparePassword(password);

        if (!isValid) return false;

        return omit(user.toJSON(), "password");
    }
}

export default UserService