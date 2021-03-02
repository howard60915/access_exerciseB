exports.up = (knex) =>
	knex.schema.createTable("vote", (table) => {
		table.increments("id").primary();
		table.string("mobile");
		table.boolean("yes");
		table.boolean("no");
		table.timestamps();
		table.dateTime("deleted_at");
	});

exports.down = (knex) => knex.schema.dropTable("vote");
