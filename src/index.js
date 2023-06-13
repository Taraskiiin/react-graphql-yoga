import { GraphQLServer } from "graphql-yoga";
import axios from "axios";

const server = new GraphQLServer({
    typeDefs: `
      type Query {
        agent(id:ID!): User!
        agents: [User!]
        multiply(value: Int!): Int
      }

      type User {
        id: ID
        name: String
        age: Int
        married: Boolean
        average: Float
      }
    `,
    resolvers: {
        Query: {
            agent: async (parent, args, context, info) => {
                const res = await axios.get(
                    `http://localhost:3004/users/${args.id}`
                );
                return res.data;
            },
            agents: async () => {
                const res = await axios.get("http://localhost:3004/users");
                return res.data;
            },
            multiply: async (parent, args, context, info) => {
                return args.value * 10;
            },
        },
    },
});

server.start({ port: 5000 }, () => {
    console.log("Server is running.");
});
