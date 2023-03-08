import datasource from "../lib/datasource";

export default class NoteService {
  //le constructeur qui charge db pour chaque instanciation
  constructor() {
    this.db = datasource.getRepository("Note");
  }

  // async createNote({ label }) {
  //   const note = this.db.create({ label });
  //   return await this.db.save(note);
  // }

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
  // async update({ id, ...other }) {
  //   let note = await this.findById(id);
  //   Object.keys(other).forEach((value) => {
  //     if (other[value]) {
  //       note[value] = other[value];
  //     }
  //   });
  //   return await this.db.save(note);
  // }
}
