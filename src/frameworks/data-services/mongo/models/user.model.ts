import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  firstName: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  lastName: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  username: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
