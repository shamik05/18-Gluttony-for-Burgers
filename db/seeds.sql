-- Specifies what database to use
USE burgers_db;

-- Insert sample burgers names
INSERT INTO burgers (burger_name)
VALUES ("World Burger"), ("Ottawa Burger"), ("Montreal Burger"), ("Paris Burger"), ("Regular Burger"), ("Test Burger");

-- Inserts ingredient names along with their type
INSERT INTO ingredients (ingredient_name, ingredient_type)
VALUES ("cheddar", "cheese"), ("holed", "cheese"), ("ketchup", "dressing"), ("mayo", "dressing"), ("mustard", "dressing"), ("bacon", "meat"), ("beef", "meat"), ("chicken", "meat"), ("salami", "meat"), ("cucumber", "veggies"), ("lettuce", "veggies"), ("mushroom", "veggies"), ("onion", "veggies"), ("pepper", "veggies"), ("tomato", "veggies");