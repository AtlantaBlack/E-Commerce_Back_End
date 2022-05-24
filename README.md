# E-Commerce Back End
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This project is an e-commerce back end that uses an API development platform connected to a SQL-powered database in order to test functionalities such as item retrieval, updates, and deletions.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Demo](#demo)
5. [Screenshots](#screenshots)
6. [License](#license)
7. [Resources](#resources)
8. [Contact](#contact)

## Technologies Used

This application uses the following technologies:

* JavaScript
* [Node.js](https://nodejs.dev/)
* [Express.js](https://expressjs.com/)
* [MySQL 2](https://www.mysql.com/)
* [Sequelize](https://sequelize.org/)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Insomnia](https://insomnia.rest/)

## Installation

This project requires Node.js, MySQL 2, and an API development platform such as Insomnia or Postman in order to run effectively. It also requires installation of a few npm packages: Express, Sequelize, dotenv, and nodemon.

First, clone the [E-Commerce Back End repository](https://github.com/AtlantaBlack/E-Commerce_Back_End) or download the repository to your machine. Then, using Terminal or the command line application of your choice, navigate to the root directory of the E-Commerce Back End folder.

### Creating the .env file

In Terminal, remain in the root directory of the application folder and run the following command: 

`touch .env`

This will create a .env file for you to fill in.

After, open the folder in Visual Studio Code or your choice of source code editor. Copy the contents of the `.env.EXAMPLE` file into your newly created `.env` file.

Fill out the blank user and password fields and save.

```
DB_NAME='ecommerce_db'
DB_USER='root'
DB_PW='your_mysql_password_here'

```

### Installing Node packages

Install all required packages by running the following code:

`npm install` OR `npm i`

### Sourcing Schema

The database for this application will first need to be created locally.

In Terminal, if you are not already in the root directory of E-Commerce Back End, go to that folder first. Then, navigate into the database folder of the application by running the following command: `cd db`

Enter the MySQL shell using the following command: `mysql -u root -p`

Enter your MySQL password.

Run the following line to create the database: `source schema.sql;`

Finally, exit the MySQL Shell: `exit`

Navigate back to the root directory of the application: `cd ..`
The database is now ready to seed with data.

### Seeding Data

With the database created, it now needs to be filled with data. In Terminal, in the root directory of your folder, enter the following command to populate the database with sample data:

`npm run seed`

## Usage

To run the application, in Terminal, make sure you are in the root directory of the E-Commerce Back End folder. Enter the following command:

`npm run watch`

The server will be live. You can now use Insomnia or API client of your choosing to interact with the database.

## Demo

**[Walkthrough video showing E-Commerce Back End in action](https://drive.google.com/file/d/1KyC1_Je1nax63aUVd-FrLgp4DK02e9ty/view)**

---

[Video showing installation steps (sourcing schema, seeding data, installing packages)](https://drive.google.com/file/d/1InO3Vgo01PjOPlNOQyDnMlYJgHVnL-Cr/view)

Below: Gif of video showing installation steps

![Demo of E-Commerce Back End: installation steps](assets/images/demo-installation.gif?raw=true "Demo of E-Commerce Back End: installation steps")


## Screenshots

Application in Insomnia

![Screenshot of E-Commerce Back End: Categories in Insomnia](assets/images/screenshot-categories.jpg?raw=true "E-Commerce Back End screenshot categories in Insomnia")

---

Adding a product

![Screenshot of E-Commerce Back End: Adding a product](assets/images/screenshot-add-product.jpg?raw=true "E-Commerce Back End screenshot adding a product")

## License

© 2022 Sushan Yue

This project is licensed under the [MIT License](./LICENSE.txt).

## Resources

* [Sequelize Documentation](https://sequelize.org/docs/v6/)
* [Sequelize - Models](https://sequelize.org/docs/v6/core-concepts/model-basics/#default-values)
* [Sequelize - Validations & Constraints](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)
* [How to use Sequelize belongsToMany() method](https://sebhastian.com/sequelize-belongstomany/#:~:text=The%20Sequelize%20belongsToMany()%20method%20is%20used%20to%20create%20a,primary%20keys%20of%20both%20models.)
* [Stack Exchange - Single/Double quotes in environment variables](https://unix.stackexchange.com/questions/16303/what-is-the-significance-of-single-and-double-quotes-in-environment-variables)
* [Stack Overflow - Decimal DataType for rounding decimals](https://stackoverflow.com/questions/13501459/decimal-datatype-is-rounding-the-values)


## Contact
[Sushan Yue @ GitHub](https://github.com/AtlantaBlack)


