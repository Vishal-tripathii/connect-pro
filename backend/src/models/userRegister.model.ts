import mongoose, { Model, mongo, Schema } from "mongoose";

export interface IUserRegister {
    name: string;
    email: string;
    password: string;
    following: mongoose.Types.ObjectId[];
    followers: mongoose.Types.ObjectId[];
}

const userSchema: Schema<IUserRegister> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Properly define the followers field
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export const User = mongoose.model('User', userSchema);
