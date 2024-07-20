import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { users, stories } from "./mocks";

interface User {
  img: string;
  name: string;
  id: string;
}

interface Story {
  id: string;
  userId: string;
  img: string;
  viewed: boolean;
  viewedAt: null | string;
  timestamp: number;
  mediaType: string;
  duration: number;
  caption: string;
}

const typedUsers: User[] = users;
const typedStories: Story[] = stories;

const app = express();
const port = process.env.PORT || 3000;

async function startApolloServer() {
  const server = new ApolloServer({
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
        stories: async (user) => {
          return typedStories.filter((story) => story.userId === user.id);
        },
      },
      Query: {
        getAllUsers: async () => {
          return typedUsers;
        },
      },

      Mutation: {
        viewStory: async (_, { storyId }) => {
          const story = typedStories.find((story) => story.id === storyId);

          if (!story) {
            throw new Error("Story not found");
          }

          story.viewed = true;
          story.viewedAt = new Date().toISOString();

          return story;
        },
      },
    },
  });

  await server.start();
  app.use(express.json());
  app.use("/graphql", expressMiddleware(server));

  app.listen(port, () => {
    console.log("Server is running on port ", port);
  });
}

startApolloServer();
