const express = require("express");
const exphbs = require("express-handlebars");
const compression = require("compression");
const routes = require("./controllers/burgers_controller.js");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(compression());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
