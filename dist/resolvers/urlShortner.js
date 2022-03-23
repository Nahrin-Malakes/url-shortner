"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlResolver = void 0;
const client_1 = require("@prisma/client");
const type_graphql_1 = require("type-graphql");
const randomstring_1 = require("randomstring");
const prisma = new client_1.PrismaClient();
let UrlResolver = class UrlResolver {
    hello() {
        return "world";
    }
    async shortUrl({ req }, url) {
        const savedUrl = await prisma.url.create({
            data: {
                url,
                short_url: (0, randomstring_1.generate)({ length: 6 }),
            },
        });
        const parsedUrl = `http://${req.headers.host}/${savedUrl.short_url}`;
        return parsedUrl;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UrlResolver.prototype, "hello", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("url", { description: "Url to short" })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UrlResolver.prototype, "shortUrl", null);
UrlResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UrlResolver);
exports.UrlResolver = UrlResolver;
//# sourceMappingURL=urlShortner.js.map