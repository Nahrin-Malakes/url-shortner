import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

import { UrlResolver } from "./resolvers/urlShortner";
import { Context } from "./types";

(async () => {
  const app = express();
  const prisma = new PrismaClient();
  app.use(cors({ credentials: false, origin: ["http://localhost:3000"] }));

  app.get("/:id", async (req, res) => {
    const url = await prisma.url.findUnique({
      where: {
        short_url: req.params.id,
      },
    });
    if (url) {
      res.redirect(url.url);
    } else {
      res.status(404).json({ error: "Url not found" });
    }
  });

  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UrlResolver],
      validate: false,
    }),
    context: ({ req, res }): Context => ({ req, res }),
  });
  await apollo.start();
  apollo.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT || 4000, () => {
    console.log("Server started on http://localhost:4000");
  });
})();
