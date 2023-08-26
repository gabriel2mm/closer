import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Permission } from "./permission.entity";
import mongoose, { HydratedDocument } from "mongoose";

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ timestamps: true })
export class Profile{ 

    @Prop()
    name: string;

    @Prop()
    active: boolean;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permissions' }] })
    permissions: Permission[]
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);