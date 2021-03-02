import { GraphQLServer } from "graphql-yoga";
import morgan from "morgan";
import cors from "cors";

/** cors allow domain */
const { ORIGIN } = process.env;

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
	Query: {
		hello: (_, { name }) => `Hello ${name || "World"}`,
	},
};

const server = new GraphQLServer({ typeDefs, resolvers });

/** Cors config */
const corsOption = {
	origin: ORIGIN ? new RegExp(ORIGIN, "i") : true,
	credentials: true,
};

/** setting CORS constraint */
server.express.use(cors(corsOption));

server.express.use(
	morgan(":method :url :status - :response-time ms - FROM :remote-addr"),
);

export default server;
