// Import dependencies
const orm = require("../config/orm");

const burger = {
  all: async () => orm.selectAll("burgers"),
  create: async (col, val) => orm.insertOne("burgers", col, val),
  update: async (col, values, condition) => orm.updateOne("burgers", col, values, condition),
};

module.exports = burger;
