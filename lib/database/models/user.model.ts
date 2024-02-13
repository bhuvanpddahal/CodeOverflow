import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    image: { type: String, default: '' },
    password: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
});

const User = models.User || model('User', UserSchema);
export default User;