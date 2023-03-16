import { DeleteResult, Repository } from "typeorm";
import datasource from "../lib/datasource";
import { IWilderCreate } from "../routes/routes.d";
import LanguageService from "./Language.service";
import NoteService from "./Note.service";
import WilderEntity from "../entity/Wilder.entity";
import {
  IAssignNote,
  ILanguageUpdateKey,
  IMessageWithSuccess,
  IWilderUpdateKey,
} from "./services.d";
import NoteEntity from "../entity/Note.entity";

export default class WilderService {
  db: Repository<WilderEntity>;
  //le constructeur qui charge db pour chaque instanciation
  constructor() {
    this.db = datasource.getRepository("Wilder");
  }

  async createWilder({
    first_name,
    last_name,
    email,
    notes,
  }: IWilderCreate): Promise<WilderEntity> {
    const wilder: WilderEntity = this.db.create({
      first_name,
      last_name,
      email,
    });
    let wilderSaved = await this.db.save(wilder);
    notes?.forEach(({ language: { id: languageId }, note }) => {
      this.assignNote({
        languageId,
        wilderId: wilderSaved.id,
        note,
      });
    });
    return wilderSaved;
  }

  async list(): Promise<WilderEntity[]> {
    return await this.db
      .createQueryBuilder("wilder")
      .leftJoinAndSelect("wilder.notes", "note")
      .leftJoinAndSelect("note.language", "language")
      .getMany();
  }

  async findById(id: string): Promise<IWilderUpdateKey> {
    // let wilder: WilderEntity | null = await this.db.findOneBy({ id });
    let wilder = await this.db
      .createQueryBuilder("wilder")
      .leftJoinAndSelect("wilder.notes", "note")
      .leftJoinAndSelect("note.language", "language")
      .where("wilder.id = :id", { id })
      .getOne();
    if (!wilder) {
      throw new Error("Ce wilder n'existe pas");
    }
    return wilder as IWilderUpdateKey;
  }

  async delete(id: string): Promise<IMessageWithSuccess> {
    let result: DeleteResult = await this.db.delete({ id });
    if (result.affected === 0) {
      throw new Error("Problème, ce wilder n'existe peut être pas?");
    }
    return {
      success: true,
      message: "Wilder supprimé",
    };
  }
  async update({ id, notes, ...other }: IWilderUpdateKey) {
    let wilder: IWilderUpdateKey = await this.findById(id);
    Object.keys(other).forEach((value) => {
      if (other[value]) {
        wilder[value] = other[value];
      }
    });
    notes?.forEach(({ language: { id: languageId }, note }) => {
      this.assignNote({
        languageId,
        wilderId: wilder.id,
        note,
      });
    });
    return await this.db.save(wilder);
  }

  async assignNote({
    languageId,
    wilderId,
    note,
  }: IAssignNote): Promise<NoteEntity[]> {
    const language: ILanguageUpdateKey = await new LanguageService().findById(
      languageId
    );
    const wilder: IWilderUpdateKey = await this.findById(wilderId);
    let previousNote: NoteEntity | null =
      await new NoteService().findByRelation({
        language,
        wilder,
      });

    const noteResult: NoteEntity[] = await new NoteService().saveNote({
      ...previousNote,
      language,
      wilder,
      note,
    });
    return noteResult;
  }
}
