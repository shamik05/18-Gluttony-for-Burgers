// Import dependencies
const orm = require("../config/orm");

const burger = {
  // Get all burgers from burgers table
  all: async () => orm.selectAll("burgers"),

  // Get specific burger info by id
  get: async (table, id) => orm.getOne(table, id),

  // Get all available ingredients
  ingredients: async () => orm.selectAll("ingredients"),

  // Create the burger row with a name
  create: async (col, val) => orm.insertOne("burgers", col, val),

  // Update burger row's devour condition or name
  update: async (val, condition) => orm.updateOne("burgers", val, condition),

  // Update burger ingredients
  updateBurger: async (val, condition) => orm.updateIngredients("burgeritems", val, condition),
};

module.exports = burger;
