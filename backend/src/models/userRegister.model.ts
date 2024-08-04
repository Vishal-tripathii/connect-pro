import mongoose, { Model, Schema } from "mongoose";

export interface IUserRegister {
    name: string;
    email: string;
    password: string;
}

export const userSchema = new Schema<IUserRegister>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

export const User = mongoose.model('User', userSchema);
