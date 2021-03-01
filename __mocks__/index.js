import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

server.listen(8080);

const { port } = server.address();

process.env.HTTP_URI = `http://localhost:${port}`;

// eslint-disable-next-line no-console
console.log(`🚀 Server ready at ${process.env.HTTP_URI}`);

afterAll(async () => server.close());
