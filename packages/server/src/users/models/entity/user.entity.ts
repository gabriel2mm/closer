import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Profile } from "./profile.entity";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ required: true, maxlength: 50, minlength: 3 })
    name: string;

    @Prop({ maxlength: 11})
    CPF: string;

    @Prop({ required: true })
    birthDate: Date;

    @Prop({ required: true, unique: true, maxlength: 30})
    login: string;

    @Prop({ required: true, maxlength: 50, unique: true})
    email: string;

    @Prop({ required: true, maxlength: 255, minlength: 6, lowercase: false })
    password: string;

    @Prop()
    avatarName: string;

    @Prop({ default: false})
    contentCreator: boolean;

    @Prop({ default: true })
    active: boolean;

    @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' } })
    profile: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);