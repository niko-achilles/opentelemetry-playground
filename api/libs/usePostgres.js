const keys = require("../keys");
const { Pool } = require("pg");

module.exports = () => {
  return new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
  });
};
