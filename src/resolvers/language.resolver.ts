import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Language, { LanguageCreate } from "../entity/Language.entity";
import LanguageService from "../services/Language.service";

@Resolver()
export default class LanguageResolver {
  @Query(() => [Language])
  async languageList(): Promise<Language[]> {
    const languageList = await new LanguageService().list();
    return languageList;
  }

  @Mutation(() => Language)
  async createLanguage(
    @Arg("languageCreate") languageCreate: LanguageCreate
  ): Promise<Language> {
    const { label } = languageCreate;
    const language = await new LanguageService().createLanguage({ label });

    return language;
  }
}
