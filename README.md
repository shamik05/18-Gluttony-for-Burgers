# Gluttony for Burgers
![GitHub License](https://img.shields.io/badge/License-None-blue)
## Description
This is a burger logger application which allows one to record their burgers eaten. It has two lists, eaten and uneaten which stores a burger name given by user input. Users are also able to edit their burger name and what ingredients it contains by clicking on the burger name. The ingredients page has four sections - meat, vegetables, cheese and dressing, each with a set amount of items. The page also has an animated model viewer showing the burger's final appearance. The app stores data using MySQL and uses a backend compromised of express, node and a custom orm to handle network requests. The front end is handled using express-handlebars as the template engine. Finally, the app is hosted on heroku ![here]().
## Table of Contents
* [Installation](#Installation)
* [Configuration](#Configuration)
* [Usage](#Usage)
  * [Main](#Main)
* [License](#License)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)
## Installation
Download or clone the repo to a working directory and extract its contents. Use a **C**ommand **L**ine **I**nterface to install necessary dependencies by running the following command:
```
npm i
```
To create the database, copy the contents from ![schema](db/schema.sql) and run it any application capable of managing MySQL database. MySQL Workbench was used for the development process. 
Sample data has also been provided in the ![sql](db/seeds.sql) in the form of .csv files for populating your database and demo the app.
## Configuration
Locate the connection.js file inside the config folder and change the create connection function with your appropriate parameters.
## Usage 
Type the following in any CLI to run the app. 
```
npm start
```
Each module's functions have also been demo-ed below.
### Main
<!-- ![Main](assets/main.gif) -->
## License 
The project is currently licenseless.
## Contributing
Message the owner on github or by email.
## Questions 
If you have any questions about the repo, open an issue or contact me directly at shamik05@hotmail.com. You can find more of my work at [shamik05](https://github.com/shamik05/).