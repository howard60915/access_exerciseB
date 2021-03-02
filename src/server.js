import http from "http";
import morgan from "morgan";
import cors from "cors";
import express from "express";

/** cors allow domain */
const { ORIGIN } = process.env;

/** build server */
export const app = express();
const server = http.createServer(app);

/** Cors config */
const corsOption = {
	origin: ORIGIN ? new RegExp(ORIGIN, "i") : true,
	credentials: true,
};

/** setting CORS constraint */
app.use(cors(corsOption));

app.use(morgan(":method :url :status - :response-time ms - FROM :remote-addr"));

export default server;
