import { Arg, Mutation, Query } from "type-graphql";
import Wilder, {
  MessageWithSuccess,
  UpdateWilder,
  WilderInput,
} from "../entity/Wilder.entity";
import WilderService from "../services/Wilder.service";

export default class WilderResolver {
  @Query(() => [Wilder])
  async wilderList(): Promise<Wilder[]> {
    const wildersList = await new WilderService().list();
    return wildersList;
  }

  @Query(() => Wilder)
  async findWilder(@Arg("id") id: string): Promise<Wilder> {
    const wilder = await new WilderService().findById(id);
    return wilder;
  }

  @Mutation(() => Wilder)
  async createWilder(
    @Arg("wilderCreate") wilderCreate: WilderInput
  ): Promise<Wilder> {
    console.log("WILDERCREATE", wilderCreate);
    const { first_name, last_name, email, avatar, notes } = wilderCreate;
    const wilder = await new WilderService().createWilder({
      first_name,
      last_name,
      email,
      notes,
      avatar,
      // avatar: file?.filename,
    });

    return wilder;
  }

  @Mutation(() => MessageWithSuccess)
  async deleteWilder(@Arg("id") id: string): Promise<MessageWithSuccess> {
    const result = await new WilderService().delete(id);

    return result;
  }

  @Mutation(() => Wilder)
  async updateWilder(
    @Arg("updateWilder") updateWilder: UpdateWilder
  ): Promise<Wilder> {
    const { id, email, first_name, last_name, avatar, notes } = updateWilder;
    const wilder = await new WilderService().update({
      id,
      notes,
      first_name,
      last_name,
      email,
      avatar,
    });
    return wilder;
  }
}
