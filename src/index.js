import { GraphQLServer } from "graphql-yoga";

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
            agent() {
                return {
                    id: 1,
                    name: "Taras",
                    age: 23,
                    married: true,
                    average: 4.5,
                };
            },
            agents() {
                return [
                    {
                        id: 1,
                        name: "Taras",
                        age: 23,
                        married: true,
                        average: 4.5,
                    },

                    {
                        id: 2,
                        name: "Petro",
                        age: 26,
                        married: false,
                        average: 2.5,
                    },
                ];
            },
        },
    },
});

server.start({ port: 5000 }, () => {
    console.log("Server is running.");
});
