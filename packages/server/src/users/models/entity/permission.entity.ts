import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Profile } from "./profile.entity";
import mongoose, { HydratedDocument } from "mongoose";

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: true })
export class Permission{ 
    @Prop()
    name: string; 

    @Prop()
    description: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }] })
    profiles: Profile[];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);