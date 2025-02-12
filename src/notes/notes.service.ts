import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './schemas/note.schema';
import { DeleteResult, Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto, userId: number): Promise<Note> {
    const createdNote = new this.noteModel({ ...createNoteDto, userId });
    return createdNote.save();
  }

  async findAll(myBookId: number): Promise<Note[]> {
    return this.noteModel.find({ myBookId }).exec();
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const updatedNote = await this.noteModel
      .findByIdAndUpdate(id, { $set: updateNoteDto })
      .exec();

    if (!updatedNote) {
      throw new Error(`Note with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.noteModel.deleteOne({ _id: id }).exec();
  }
}
