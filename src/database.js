import knex from "knex";
import bookshelf from "bookshelf";
import config from "../knexfile";

/** 與 DB 的連線 */
const connection = knex(config);
const database = bookshelf(connection);

export default database;
