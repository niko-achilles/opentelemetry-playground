/* eslint-disable no-undef */
module.exports = {
  pgUser: process.env.PGUSER,
  pgHost: process.env.PGHOST,
  pgDatabase: process.env.PGDATABASE,
  pgPassword: process.env.PGPASSWORD,
  pgPort: process.env.PGPORT,
  collectorHost: process.env.COLLECTOR_HOST,
  collectorPort: process.env.COLLECTOR_PORT,
};

// module.exports = {
//   pgUser: "postgres", //process.env.PGUSER,
//   pgHost: "localhost", //process.env.PGHOST
//   pgDatabase: "postgres", //process.env.PGDATABASE,
//   pgPassword: "postgres_password", //process.env.PGPASSWORD,
//   pgPort: 5432, //process.env.PGPORT,
// };
