import http from "http";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";

/** cors allow domain */
const { ORIGIN, LIMIT_TIME, LIMIT_NUMBER } = process.env;

/** build server */
export const app = express();
const server = http.createServer(app);

/** Cors config */
const corsOption = {
	origin: ORIGIN ? new RegExp(ORIGIN, "i") : true,
	credentials: true,
};
/** request rate limit */
const limit = {
	/** 1 minute */
	windowMs: LIMIT_TIME || 1000 * 60,
	/** max request number per windowMs */
	max: LIMIT_NUMBER || 60,
	/** prevent req.ip is undefined */
	keyGenerator: (req) => {
		return req.ip || req.headers["x-forwarded-for"];
	},
};

/** setting CORS constraint */
app.use(cors(corsOption));
/** setting request rate limit */
app.use(rateLimit(limit));

/** setting middleware log
 * remote-addr is ip address
 */
app.use(morgan(":method :url :status - :response-time ms - FROM :remote-addr"));

app.post("/test", async (req, res) => {
	res.send(`request ip ${req.ip || req.headers["x-forwarded-for"]}`);
});

export default server;
