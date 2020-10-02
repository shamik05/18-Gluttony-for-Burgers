// Import dependencies
const mysql = require("mysql");
const util = require("util");

// Courtesy of Michał Męciński from https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628
// Uses the util module to promisify the mysql module to handle asynchronous behaviour
function makeDb() {
  // Set up MySQL connection
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  // Promisifies the query function and returns it
  return {
    query(sql, args) {
      return util.promisify(connection.query)
        .call(connection, sql, args);
    },
    // Promisifies the close function and returns it
    close() {
      return util.promisify(connection.end).call(connection);
    },
    // Promisifies the transaction function's beginTransaction
    beginTransaction() {
      return util.promisify(connection.beginTransaction)
        .call(connection);
    },
    // Promisifies the transaction function's commit transaction
    commit() {
      return util.promisify(connection.commit)
        .call(connection);
    },
    // Promisifies the transaction function's rollback transaction
    rollback() {
      return util.promisify(connection.rollback)
        .call(connection);
    },
  };
}

// Export connection for our ORM to use.
module.exports = makeDb();
