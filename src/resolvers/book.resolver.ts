import { MaxLength } from "class-validator";
import {
  InputType,
  Resolver,
  Mutation,
  Query,
  ObjectType,
  Field,
  Arg,
} from "type-graphql";

let books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

@ObjectType()
export class Book {
  @Field()
  title: string;

  @Field()
  author: string;
}

@InputType()
class AddBookInput {
  @Field()
  @MaxLength(20)
  title: string;

  @Field()
  author: string;
}

@Resolver()
class BookResolver {
  @Query(() => [Book])
  books(): Book[] {
    return books;
  }

  @Mutation(() => [Book])
  addBook(
    @Arg("addBookInput", { validate: true }) infos: AddBookInput
  ): Book[] {
    books.push(infos);
    return books;
  }
}

export default BookResolver;

// interface IAddBook {
//   title: string;
//   author: string;
// }

// interface IAddBookInfo {
//   infos: IAddBook;
// }

// export default {
//   Query: {
//     books: () => {
//       console.log("je renvoie", books);
//       return books;
//     },
//   },
//   Mutation: {
//     addBook(_: any, args: IAddBookInfo) {
//       books.push(args.infos);
//       return books;
//     },
//   },
// };
