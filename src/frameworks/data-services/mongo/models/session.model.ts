import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";
import { User } from "./user.model";

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
  @Prop({ type: SchemaTypes.ObjectId, ref: "User", required: true })
  user: User;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
