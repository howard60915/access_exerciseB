import mtz from "moment-timezone";
import server from "./server";

const PORT = process.env.NODE_PORT || process.env.PORT || 8080;

mtz.tz.setDefault("Asia/Taipei");

server.listen(PORT, err => {
	if (err) throw err;
	// eslint-disable-next-line no-console
	console.log(`> Ready on http://localhost:${PORT}`);
});
