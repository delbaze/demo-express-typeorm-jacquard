import datasource from "../lib/datasource";

export default class WilderService {
  constructor() {
    this.db = datasource.getRepository("Wilder");
  }

  async createWilder({ email, first_name, last_name }) {
    let wilder = this.db.create({ email, first_name, last_name });
    return await this.db.save(wilder);
  }
}
