import UserModel, { IUserDocument } from '@app/models/user.model';
import { DocumentDefinition } from 'mongoose';

const UserService = {

    async createUser(input: DocumentDefinition<IUserDocument>) {
        try {
            return await UserModel.create(input);
        } catch (error: any) {
            throw new Error(error)
        }
    }
}

export default UserService