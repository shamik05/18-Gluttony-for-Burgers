// Imports the connection details and the modified mysql functions
const db = require("./connection.js");

// Handles any database queries and results
const orm = {
  selectAll: async (table) => {
    try {
      const query = "SELECT * FROM ??";
      return await db.query(query, [table]);
    } catch (error) {
      if (error) throw error;
      return false;
    }
  },

  insertOne: async (table, col, val) => {
    try {
      const query = "INSERT INTO ??(??) values(?)";
      return await db.query(query, [table, col, val]);
    } catch (error) {
      if (error) throw error;
      return false;
    }
  },

  updateOne: async (table, val, condition) => {
    try {
      const query = "UPDATE ?? SET ? WHERE ?";
      return await db.query(query, [table, val, condition]);
    } catch (error) {
      if (error) throw error;
      return false;
    }
  },
};

// Exports all orm functions
module.exports = orm;
