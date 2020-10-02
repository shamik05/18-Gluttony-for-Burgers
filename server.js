// Import dependencies
require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const compression = require("compression");
const routes = require("./controllers/burgers_controller.js");
const helpers = require("./controllers/helpers");

const PORT = process.env.PORT || 8080;
const app = express();

// Set app compression, handlebar templates and routing
app.use(compression());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main", helpers }));
app.set("view engine", "handlebars");
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
