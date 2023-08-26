import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type RecoveryDocument = HydratedDocument<Recovery>;

@Schema({ timestamps: true })
export class Recovery {

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    token: string;

    @Prop({ default: new Date().setMinutes(new Date().getMinutes() + 5) })
    valid: Date

    @Prop({ default: false })
    used: boolean
}

export const RecoverySchema = SchemaFactory.createForClass(Recovery);