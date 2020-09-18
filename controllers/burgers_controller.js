const express = require("express");
const burger = require("../models/burger.js");

const router = express.Router();

router.get("/", (req, res) => {
  burger.all().then((result) => {
    console.log(result);
    res.render("index", { burgers: result });
  });
  //   console.log(hbsObject);
  //   res.render("index", hbsObject);
});

router.post("/api/burgers", (req, res) => {
  console.log(req.body);
  burger.create("burger_name", req.body.burger_name)
    .then((result) => {
      res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;
  console.log("condition", condition);

  burger.update({ devoured: req.body.devoured }, condition)
    .then((result) => {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      return res.status(200).end();
    });
});

module.exports = router;
