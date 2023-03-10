import datasource from "../lib/datasource";
import LanguageService from "./Language.service";
import NoteService from "./Note.service";

export default class WilderService {
  //le constructeur qui charge db pour chaque instanciation
  constructor() {
    this.db = datasource.getRepository("Wilder");
  }

  async createWilder({ first_name, last_name, email }) {
    const wilder = this.db.create({ first_name, last_name, email });

    return await this.db.save(wilder);
  }

  async list() {
    return await this.db.find();
  } 

  async findById(id) {
    let wilder = await this.db.findOneBy({ id });
    if (!wilder) {
      throw new Error("Ce wilder n'existe pas");
    }
    return wilder;
  }

  async delete(id) {
    let result = await this.db.delete({ id });
    if (result.affected === 0) {
      throw new Error("Problème, ce wilder n'existe peut être pas?");
    }
    return {
      success: true,
      message: "Wilder supprimé",
    };
  }
  async update({ id, ...other }) {
    let wilder = await this.findById(id);
    Object.keys(other).forEach((value) => {
      if (other[value]) {
        wilder[value] = other[value];
      }
    });
    return await this.db.save(wilder);
  }

  async assignNote({ languageId, wilderId, note }) {
    console.log("TEST", { languageId, wilderId, note });

    const language = await new LanguageService().findById(languageId);
    const wilder = await this.findById(wilderId);
    let previousNote = await new NoteService().findByRelation({
      language,
      wilder,
    });

    const noteResult = await new NoteService().saveNote({
      ...previousNote,
      language,
      wilder,
      note,
    });
    return noteResult;
  }
}
