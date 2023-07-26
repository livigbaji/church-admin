// auth app
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Permission } from 'backend/src/types';

export type AdminDocument = Admin & Document;

@Schema({
  versionKey: undefined,
  _id: false,
})
export class Admin {
  @ApiProperty({
    type: String,
    format: 'mongo',
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  member: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  secret: string;

  @ApiProperty()
  @Prop({
    type: String,
    enum: Permission,
    required: true,
  })
  permissions: Permission[];

  @ApiProperty()
  @Prop({
    type: Boolean,
    default: () => true,
  })
  active: boolean;

  @ApiProperty()
  @Prop({
    type: Date,
    default: () => null,
  })
  inactiveAt: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
