import datasource from "../lib/datasource";

export default class NoteService {
  constructor() {
    this.db = datasource.getRepository("Note");
  }

  async list() {
    return await this.db.find();
  }

  async findById(id) {
    let note = await this.db.findOneBy({ id });
    if (!note) {
      throw new Error("Cette note n'existe pas");
    }
    return note;
  }
  async findByRelation({ language, wilder }) {
    return await this.db.findOneBy({ language, wilder });
  }

  async delete(id) {
    let result = await this.db.delete({ id });
    if (result.affected === 0) {
      throw new Error("Problème, cette note n'existe peut être pas?");
    }
    return {
      success: true,
      message: "Note supprimée",
    };
  }
  async saveNote(data) {
    console.log('SAVE', data);
    return await this.db.save(data);
  }
}
