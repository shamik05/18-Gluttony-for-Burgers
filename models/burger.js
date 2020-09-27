// Import dependencies
const orm = require("../config/orm");

const burger = {
  all: async () => orm.selectAll("burgers"),
  ingredients: async () => orm.selectAll("items"),
  create: async (col, val) => orm.insertOne("burgers", col, val),
  update: async (val, condition) => orm.updateOne("burgers", val, condition),
};

module.exports = burger;
