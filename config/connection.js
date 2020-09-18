// Import dependencies
const mysql = require("mysql");
const util = require("util");

// Courtesy of Michał Męciński from https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628
// Uses the util module to promisify the mysql module to handle asynchronous behaviour

function makeDb() {
  // Set up MySQL connection
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "&_Q32y^HuOwp",
    database: "burgers_db",
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
  };

  // Make Connection
  // connection.connect((err) => {
  //   if (err) {
  //     console.log(`error connecting: ${err.stack}`);
  //     return;
  //   }
  //   console.log(`connected as id ${connection.threadId}`);
  // });
}

// Export connection for our ORM to use.
module.exports = makeDb();
