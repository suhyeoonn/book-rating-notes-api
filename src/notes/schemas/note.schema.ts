import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop()
  myBookId: number; // my Books에 등록된 고유 아이디

  @Prop()
  bookId: number; // book 테이블의 고유 아이디

  @Prop()
  userId: number;

  @Prop({ default: '' })
  title: string;

  @Prop({ type: Object })
  content: Record<string, any>;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
