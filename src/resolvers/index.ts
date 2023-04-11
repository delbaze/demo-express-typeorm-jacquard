import { mergeResolvers } from "@graphql-tools/merge";
import bookResolver from "./book.resolver";
import wilderResolver from "./wilder.resolver";

const resolvers = [bookResolver, wilderResolver];

export default mergeResolvers(resolvers);
