import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Note from "../entity/Note.entity";
import { MessageWithSuccess } from "../entity/Wilder.entity";
import NoteService from "../services/Note.service";

@Resolver()
export default class NoteResolver {
  @Query(() => [Note])
  async noteList(): Promise<Note[]> {
    const noteList = await new NoteService().list();
    return noteList;
  }
  @Query(() => Note)
  async findNote(@Arg("id") id: string): Promise<Note> {
    const note = await new NoteService().findById(id);
    return note;
  }

  @Mutation(() => Note)
  async deleteNote(@Arg("id") id: string): Promise<MessageWithSuccess> {
    const result = await new NoteService().delete(id);
    return result;
  }
}
