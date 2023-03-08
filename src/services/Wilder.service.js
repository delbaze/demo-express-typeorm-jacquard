import datasource from "../lib/datasource";

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
}
