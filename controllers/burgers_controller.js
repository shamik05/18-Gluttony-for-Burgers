const express = require("express");
const burger = require("../models/burger.js");

const router = express.Router();

router.get("/", (req, res) => {
  burger.all().then((result) => {
    console.log(result);
    res.render("index", { burgers: result });
  });
});

router.get("/customize", (req, res) => {
  burger.ingredients().then((result) => {
    // console.log(result);
    const meat = result.filter((element) => element.item_type === "meat");
    const veggies = result.filter((element) => element.item_type === "veggies");
    const cheese = result.filter((element) => element.item_type === "cheese");
    const dressing = result.filter((element) => element.item_type === "dressing");
    res.render("customize", {
      meat, veggies, cheese, dressing,
    });
  });
});

router.get("/items", (req, res) => {
  burger.all().then((result) => {
    console.log(result);
    res.render("index", { burgers: result });
  });
});

router.post("/api/burgers", (req, res) => {
  burger.create("burger_name", req.body.burger_name)
    .then((result) => {
      console.log(result.insertId);
      res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", (req, res) => {
  const condition = { id: req.params.id };
  const devoured = req.body;
  burger.update(devoured, condition)
    .then((result) => {
      console.log(result.changedRows);
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      return res.status(200).end();
    });
});

module.exports = router;
