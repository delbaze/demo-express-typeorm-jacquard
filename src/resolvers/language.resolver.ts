import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Language, {
  LanguageCreate,
  LanguageUpdate,
} from "../entity/Language.entity";
import { MessageWithSuccess } from "../entity/Wilder.entity";
import LanguageService from "../services/Language.service";

@Resolver()
export default class LanguageResolver {
  @Query(() => [Language])
  async languageList(): Promise<Language[]> {
    const languageList = await new LanguageService().list();
    return languageList;
  }

  @Query(() => Language)
  async findLanguage(@Arg("id") id: string): Promise<Language> {
    const language = await new LanguageService().findById(id);
    return language;
  }

  @Mutation(() => Language)
  async createLanguage(
    @Arg("languageCreate") languageCreate: LanguageCreate
  ): Promise<Language> {
    const { label } = languageCreate;
    const language = await new LanguageService().createLanguage({ label });

    return language;
  }

  @Mutation(() => MessageWithSuccess)
  async deleteLanguage(@Arg("id") id: string): Promise<MessageWithSuccess> {
    const result = await new LanguageService().delete(id);
    return result;
  }

  @Mutation(() => Language)
  async updateLanguage(
    @Arg("languageUpdate") languageUpdate: LanguageUpdate
  ): Promise<Language> {
    const { id, label } = languageUpdate;
    const language: Language = await new LanguageService().update({
      id,
      label,
    });
    return language;
  }
}
