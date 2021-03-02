const {
	DATABASE_URL,
	DATABASE_HOST,
	DATABASE_USER,
	DATABASE_PASSWORD,
	DATABASE_DB,
} = process.env;

module.exports = {
	client: "pg",
	connection: DATABASE_URL || {
		host: DATABASE_HOST || "localhost",
		user: DATABASE_USER || "postgres",
		password: DATABASE_PASSWORD || null,
		database: DATABASE_DB || "exercise",
	},
};
