import { GraphQLServer } from "graphql-yoga";
import axios from "axios";

const db = "http://localhost:3000";

const server = new GraphQLServer({
    typeDefs: `
      type Query {
        agent(id:ID!): User!
        agents: [User!]
        multiply(value: Int!): Int
        cars: [String]
        msg(values:[String!]!): String
        posts: [Post!]!
        post(id:ID!): Post!
      }

      type User {
        id: ID
        name: String
        age: Int
        married: Boolean
        average: Float
      }

      type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
      }
    `,
    resolvers: {
        Query: {
            agent: async (parent, args, context, info) => {
                const res = await axios.get(`${db}/users/${args.id}`);
                return res.data;
            },
            agents: async () => {
                const res = await axios.get(`${db}/users`);
                return res.data;
            },
            multiply: async (parent, args, context, info) => {
                return args.value * 10;
            },
            cars: () => {
                return ["Ford", "Mazda", "BMW"];
            },
            msg: async (parent, args, context, info) => {
                if (args.values.length === 0) {
                    return `empty values`;
                }
                return `hello ${args.values[0]} ${args.values[1]}`;
            },
            posts: async (parent, args, context, info) => {
                const response = await axios.get(`${db}/posts`);
                return response.data;
            },
            post: async (parent, args, context, info) => {
                const response = await axios.get(`${db}/posts/${args.id}`);
                return response.data;
            },
        },
        Post: {
            author: async (parent, args, context, info) => {
                const response = await axios.get(
                    `${db}/users/${parent.author}`
                );
                return response.data;
            },
        },
    },
});

server.start({ port: 5000 }, () => {
    console.log("Server is running.");
});
