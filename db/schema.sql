-- Create the database
DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

USE burgers_db;

-- Creates the burger table with name and devoured status
CREATE TABLE burgers (
  id INTEGER AUTO_INCREMENT NOT NULL,
  burger_name VARCHAR(100) NOT NULL,
  devoured BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);

-- Creates the ingredient table with name and one of four types
CREATE TABLE ingredients (
  id INTEGER AUTO_INCREMENT NOT NULL,
  ingredient_name VARCHAR(100) NOT NULL,
  ingredient_type ENUM("bun", "cheese", "dressing", "meat", "veggies") NOT NULL,
  PRIMARY KEY (id)
);

-- Creates burgeritems table to store which ingredients a burger has
CREATE TABLE burgeritems (
  id INTEGER AUTO_INCREMENT NOT NULL,
  ingredient_id INTEGER NULL,
  burger_id INTEGER NULL,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
  FOREIGN KEY (burger_id) REFERENCES burgers(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
)