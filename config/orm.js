// Imports the connection details and the modified mysql functions
const db = require("./connection.js");

// Handles any database queries and results
const orm = {
  // Gets all columns from any of the three tables
  selectAll: async (table) => {
    try {
      // Query to run with user specific table
      const query = "SELECT * FROM ??";
      // Returns the result as a promise
      return await db.query(query, [table]);
    } catch (error) {
      // Error handling
      if (error) throw error;
      return false;
    }
  },

  // Get specific row(s) from the burgers or burgeritems table
  getOne: async (table, id) => {
    try {
      // Query to run with user specified table and condition
      const query = "SELECT * FROM ?? WHERE ?";
      return await db.query(query, [table, id]);
    } catch (error) {
      // Error handling
      if (error) throw error;
      return false;
    }
  },

  // Insert a burger into the burger table
  insertOne: async (table, col, val) => {
    try {
      // Query to run with user specified burgername
      const query = "INSERT INTO ??(??) values(?)";
      return await db.query(query, [table, col, val]);
    } catch (error) {
      // Error handling
      if (error) throw error;
      return false;
    }
  },

  // Update a burger's devoured status
  updateOne: async (table, val, condition) => {
    try {
      // Query to run with user specified id and devoured state to set
      const query = "UPDATE ?? SET ? WHERE ?";
      return await db.query(query, [table, val, condition]);
    } catch (error) {
      // Error handling
      if (error) throw error;
      return false;
    }
  },

  // Update a burger's ingredients by first deleting any current rows from the burgeritems table
  // Then inserting new rows based on user input
  updateIngredients: async (table, val, burgerid) => {
    try {
      // Construct an array of values for mass inserting rows in the burgeritems table
      const valBulk = [];
      val.forEach((ingredient) => {
        valBulk.push([ingredient, burgerid]);
      });

      // Bundles the delete and insert queries in a transaction
      await db.beginTransaction();
      // Query to delete all existing burger ingredients from the burgeritems table
      const queryDel = "DELETE FROM ?? where burger_id = ?";
      await db.query(queryDel, [table, burgerid]);

      // If user chooses to leave the burger ingredients empty then there are no values to insert
      if (val.length !== 0) {
        const queryIns = "INSERT INTO ??(ingredient_id, burger_id) VALUES ?";
        await db.query(queryIns, [table, valBulk]);
      }
      return await db.commit();
    } catch (err) {
      // Error handling
      await db.rollback();
      return false;
    }
  },
};

// Exports all orm functions
module.exports = orm;
