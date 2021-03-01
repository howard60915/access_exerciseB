import axios from "axios";
import server from "../server";

export const testServer = server.listen();

const { port } = server.address();

const baseURL = `http://127.0.0.1:${port}`;

export const client = axios.create({ baseURL });
