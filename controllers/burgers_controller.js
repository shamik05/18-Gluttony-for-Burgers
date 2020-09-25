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
  res.render("customize");
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
