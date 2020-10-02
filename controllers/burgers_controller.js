// Import dependencies
const express = require("express");
const burger = require("../models/burger.js");

const router = express.Router();

// Index page route
router.get("/", async (req, res) => {
  burger.all().then((result) => {
    // Get all burgers and seperate them into either eaten or uneaten
    const eaten = [];
    const uneaten = [];
    result.forEach((element) => (element.devoured ? eaten.push(element) : uneaten.push(element)));

    // Pass both arrays and change button text to Submit
    res.render("index", {
      eaten, uneaten, btnText: "Submit", new: true,
    });
  });
});

// Burger ingredients page route accessed by clicking on burger name
router.get("/customize/:id", async (req, res) => {
  // Get burger info with id
  const burgerName = await burger.get("burgers", { id: req.params.id });
  // Get all ingredients using id as the foreign key in burgeritems
  const burgerItems = await burger.get("burgeritems", { burger_id: req.params.id });

  // If burger doesn't exist then redirect to index page
  if (!burgerName.length) {
    return res.redirect("/");
  }

  // If burger exists then get any existing ingredients from the burgeritems table
  const items = [];
  burgerItems.forEach((element) => {
    items.push(element.ingredient_id);
  });

  // Get all available ingredients and seperate them by type
  const result = await burger.ingredients();
  const meat = result.filter((element) => element.ingredient_type === "meat");
  const veggies = result.filter((element) => element.ingredient_type === "veggies");
  const cheese = result.filter((element) => element.ingredient_type === "cheese");
  const dressing = result.filter((element) => element.ingredient_type === "dressing");

  // Send all information to the customize page
  return res.render("customize", {
    meat, veggies, cheese, dressing, btnText: "Update", inputName: burgerName[0].burger_name, burgerid: req.params.id, items,
  });
});

// Route for saving burger name when user hits submit
router.post("/api/burgers", async (req, res) => {
  // Get burger name from req.body
  burger.create("burger_name", req.body.burger_name)
    .then((result) => {
      // console.log(result.insertId);
      // Return inserted id as json
      res.json({ id: result.insertId });
    });
});

// Route to update burger's eaten status
router.put("/api/burgers/:id", async (req, res) => {
  // Get burger id and current devour status
  const condition = { id: req.params.id };
  const devoured = req.body;
  // Update burger table and return result
  burger.update(devoured, condition)
    .then((result) => {
      // console.log(result.changedRows);
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      return res.status(200).end();
    });
});

// Route to update burger ingredients
router.put("/api/burgeritems/:id", async (req, res) => {
  // Get new burger name and update it
  await burger.update({ burger_name: req.body.newName }, { id: req.params.id });
  // Get user updated ingredients and start transaction to update it
  burger.updateBurger(req.body.id, req.params.id)
    .then((result) => {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      return res.status(200).end();
    });
});

// Root page to default to if any routes are spelled wrong
router.get("*", async (req, res) => {
  res.redirect("/");
});

// Export routes
module.exports = router;
