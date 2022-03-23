import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { generate } from "randomstring";

import { Context } from "../types";

const prisma = new PrismaClient();

@Resolver()
export class UrlResolver {
  @Query(() => String)
  hello() {
    return "world";
  }

  @Mutation(() => String)
  async shortUrl(
    @Ctx() { req }: Context,
    @Arg("url", { description: "Url to short" }) url: string
  ) {
    const savedUrl = await prisma.url.create({
      data: {
        url,
        short_url: generate({ length: 6 }),
      },
    });
    const parsedUrl = `http://${req.headers.host}/${savedUrl.short_url}`;

    return parsedUrl;
  }
}
