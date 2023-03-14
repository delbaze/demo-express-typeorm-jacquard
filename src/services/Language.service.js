import datasource from "../lib/datasource";

export default class LanguageService {
  //le constructeur qui charge db pour chaque instanciation
  constructor() {
    this.db = datasource.getRepository("Language");
  }

  async createLanguage({ label }) {
    const language = this.db.create({ label });
    return await this.db.save(language);
  }

  async list() {
    return await this.db.find();
  }

  async findById(id) {
    let language = await this.db.findOneBy({ id });
    if (!language) {
      throw new Error("Ce langage n'existe pas");
    }
    return language;
  }

  async delete(id) {
    let result = await this.db.delete({ id });
    if (result.affected === 0) {
      throw new Error("Problème, ce langage n'existe peut être pas?");
    }
    return {
      success: true,
      message: "Langage supprimé",
    };
  }
  async update({ id, ...other }) {
    let language = await this.findById(id);
    Object.keys(other).forEach((value) => {
      if (other[value]) {
        language[value] = other[value];
      }
    });
    return await this.db.save(language);
  }
}
