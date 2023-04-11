import { Arg, Query, Resolver, Mutation } from "type-graphql";
import WilderEntity, {
  MessageWithSuccess,
  WilderInput,
} from "../entity/Wilder.entity";
import WilderService from "../services/Wilder.service";

@Resolver()
export default class WilderResolver {
  @Query(() => [WilderEntity])
  async listWilders(): Promise<WilderEntity[]> {
    let wilders: WilderEntity[] = await new WilderService().list();
    return wilders;
  }

  @Query(() => WilderEntity)
  async findWilderById(
    @Arg("id")
    id: string
  ): Promise<WilderEntity> {
    let wilder = await new WilderService().findById(id);
    return wilder;
  }

  @Mutation(() => MessageWithSuccess)
  async deleteWilder(
    @Arg("id")
    id: string
  ): Promise<MessageWithSuccess> {
    try {
      const result = await new WilderService().delete(id);
      return result;
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  @Mutation(() => WilderEntity)
  async updateWilder(
    @Arg("wilderUpdate") wilderUpdate: WilderInput
  ): Promise<WilderEntity> {
    const {id, first_name, last_name, email, notes } = wilderUpdate;
    const wilder = await new WilderService().update({
      id,
      notes,
      first_name,
      last_name,
      email,
      // avatar: file?.filename,
    });
    //   console.log("FILE", file);
    //   if (file) {
    // moveFile(file.path, file.filename);
    //   }

    return wilder;
  }
}
