import mtz from "moment-timezone";
import server from "./server";

const PORT = process.env.NODE_PORT || process.env.PORT || 4000;

const options = {
	port: PORT,
	endpoint: "/graphql",
	playground: "/playground",
};

mtz.tz.setDefault("Asia/Taipei");

server.start(options, ({ port }) => {
	// eslint-disable-next-line no-console
	console.log(`> Ready on http://localhost:${port}`);
});
