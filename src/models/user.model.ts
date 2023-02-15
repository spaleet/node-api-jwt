import mongoose from "mongoose";
import bcrypt from 'bcrypt';

export interface IUserDocument extends mongoose.Document {
    email: string
    username: string
    password: string
    createdAt: Date
    updatedAt: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

// encrypt new password
userSchema.pre("save", async function (next) {
    let user = this as IUserDocument;

    if (!user.isModified('password')) {
        return next();
    }

    const saltWorkFactor = parseInt(process.env.SALT_WORK_FACTOR!) ?? 10;

    const salt = await bcrypt.genSalt(saltWorkFactor);

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
})

// comparePassword
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as IUserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const UserModel = mongoose.model<IUserDocument>("User", userSchema);

export default UserModel;


export interface UpdateUserInputModel {
    email: string
    username: string
    oldPassword: string
    newPassword: string
}