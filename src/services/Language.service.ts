import { DeleteResult, Repository } from "typeorm";
import datasource from "../lib/datasource";
import LanguageEntity from "../entity/Language.entity";
import {
  IMessageWithSuccess,
  ILanguageUpdateKey,
} from "../services/services.d";
export default class LanguageService {
  //le constructeur qui charge db pour chaque instanciation
  db: Repository<LanguageEntity>;
  constructor() {
    this.db = datasource.getRepository("Language");
  }

  async createLanguage({ label }: any): Promise<LanguageEntity> {
    const language: LanguageEntity = this.db.create({ label });
    return await this.db.save(language);
  }

  async list(): Promise<LanguageEntity[]> {
    return await this.db.find();
  }

  async findById(id: string): Promise<ILanguageUpdateKey> {
    let language: LanguageEntity | null = await this.db.findOneBy({ id });
    if (!language) {
      throw new Error("Ce langage n'existe pas");
    }
    return language as ILanguageUpdateKey;
  }

  async delete(id: string): Promise<IMessageWithSuccess> {
    let result: DeleteResult = await this.db.delete({ id });
    if (result.affected === 0) {
      throw new Error("Problème, ce langage n'existe peut être pas?");
    }
    return {
      success: true,
      message: "Langage supprimé",
    };
  }
  async update({ id, ...other }: ILanguageUpdateKey) {
    let language: ILanguageUpdateKey = await this.findById(id);
    Object.keys(other).forEach((value) => {
      if (other[value]) {
        language[value] = other[value];
      }
    });
    return await this.db.save(language);
  }
}
