import mongoose from "mongoose";
import { IUserDocument } from '@models';

export interface ISessionDocument extends mongoose.Document {
    user: IUserDocument['_id']
    valid: boolean
    userAgent: string
    createdAt: Date
    updatedAt: Date
}

const sessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }
}, {
    timestamps: true
});
const SessionModel = mongoose.model<ISessionDocument>("Session", sessionSchema);

export default SessionModel;