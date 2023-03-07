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
}
