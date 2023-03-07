import WilderEntity from "../entity/Wilder.entity";
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
    // const wilder = await this.db.findOne({ where: { id } });
    const wilder = await this.db.findOneBy({ id });
    if (!wilder) {
      throw new Error("Ce wilder n'existe pas");
    }
    return wilder;
  }

  async deleteById(id) {
    const result = await this.db.delete({ id });
    if (result.affected === 0) {
      throw new Error("Problème, ce wilder n'existe peut être pas?");
    }

    return {
      success: true,
      message: `Le wilder ayant l'id ${id} a été supprimé`,
    };
  }

  async update({ id, ...other }) {
    let wilder = await this.findById(id);
    //premiere solution
    Object.keys(other).forEach((value) => {
      if (other[value]) {
        wilder[value] = other[value];
      }
    });
    return await this.db.save(wilder);
    //deuxième solution
    // let res = await this.db.update(wilder.id, other);
    // return res
  }
}
