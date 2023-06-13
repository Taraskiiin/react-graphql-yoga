import { GraphQLServer } from "graphql-yoga";
import axios from "axios";

const server = new GraphQLServer({
    typeDefs: `
      type Query {
        agent: User!
        agents: [User!]
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
            agent: async () => {
                const res = await axios.get("http://localhost:3004/users/1");
                return res.data;
            },
            agents: async () => {
                const res = await axios.get("http://localhost:3004/users");
                return res.data;
            },
        },
    },
});

server.start({ port: 5000 }, () => {
    console.log("Server is running.");
});
