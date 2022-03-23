"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const urlShortner_1 = require("./resolvers/urlShortner");
(async () => {
    const app = (0, express_1.default)();
    const prisma = new client_1.PrismaClient();
    app.use((0, cors_1.default)({ credentials: false, origin: ["http://localhost:3000"] }));
    app.get("/:id", async (req, res) => {
        const url = await prisma.url.findUnique({
            where: {
                short_url: req.params.id,
            },
        });
        if (url) {
            res.redirect(url.url);
        }
        else {
            res.status(404).json({ error: "Url not found" });
        }
    });
    const apollo = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [urlShortner_1.UrlResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    await apollo.start();
    apollo.applyMiddleware({ app, cors: false });
    app.listen(process.env.PORT || 4000, () => {
        console.log("Server started on http://localhost:4000");
    });
})();
//# sourceMappingURL=index.js.map