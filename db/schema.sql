-- COMMENT
DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

-- COMMENT
USE burgers_db;

-- COMMENT
CREATE TABLE burgers (
  id INTEGER AUTO_INCREMENT NOT NULL,
  burger_name VARCHAR(100) NOT NULL,
  devoured BOOLEAN DEFAULT false,
  custom BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);

CREATE TABLE items (
  id INTEGER AUTO_INCREMENT NOT NULL,
  item_name VARCHAR(100) NOT NULL,
  item_type ENUM("bun", "cheese", "dressing", "meat", "veggies") NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE customburgers (
  id INTEGER AUTO_INCREMENT NOT NULL,
  item_id INTEGER NULL,
  burger_id INTEGER NULL,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE SET NULL,
  FOREIGN KEY (burger_id) REFERENCES burgers(id) ON DELETE SET NULL,
  PRIMARY KEY (id)
)