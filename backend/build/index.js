"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const mocks_1 = require("./mocks");
const typedUsers = mocks_1.users;
const typedStories = mocks_1.stories;
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new server_1.ApolloServer({
            typeDefs: `
      type Story {
        id: ID!
        img: String!
        viewed: Boolean!
        viewedAt: String
        timestamp: String!
        mediaType: String!
        duration: Int!
        caption: String!
      }
      
      type User {
        id: ID!
        img: String
        name: String!
        stories: [Story]
      }

      type Query {
        getAllUsers: [User]
      }

      type Mutation {
        viewStory(storyId: ID!): Story
      }
    `,
            resolvers: {
                User: {
                    stories: (user) => __awaiter(this, void 0, void 0, function* () {
                        return typedStories.filter((story) => story.userId === user.id);
                    }),
                },
                Query: {
                    getAllUsers: () => __awaiter(this, void 0, void 0, function* () {
                        return typedUsers;
                    }),
                },
                Mutation: {
                    viewStory: (_1, _a) => __awaiter(this, [_1, _a], void 0, function* (_, { storyId }) {
                        const story = typedStories.find((story) => story.id === storyId);
                        if (!story) {
                            throw new Error("Story not found");
                        }
                        story.viewed = true;
                        story.viewedAt = new Date().toISOString();
                        return story;
                    }),
                },
            },
        });
        yield server.start();
        app.use(express_1.default.json());
        app.use("/graphql", (0, express4_1.expressMiddleware)(server));
        app.listen(port, () => {
            console.log("Server is running on port ", port);
        });
    });
}
startApolloServer();
