# Sons-of-Thunder

Welcome to the Sons-of-Thunder project! This platform is designed for the passionate gamers of World of Warcraft and other games, offering a personalized space to showcase your gaming achievements, stats, characters, and more. Join us in fostering a vibrant community built by gamers, for gamers.

## Getting Started

Follow these instructions to set up the project locally and embark on your development journey.

### Prerequisites
Before you begin, make sure you have the following installed:

### Node.js
**Download and Install:**
- Node.js LTS Version: Recommended for most users. Includes npm, the package manager for JavaScript.

### PostgreSQL
**Download and Install:**
- PostgreSQL: Choose the version that's right for your operating system.

**Installation Instructions:**
Follow the installation instructions on the respective download pages to set up the software on your system.

---

After installation, verify that both Node.js and PostgreSQL are correctly installed by running the following commands in your terminal:

```
node -v
psql --version
```

### Cloning Repo
- Clone the repository to your local machine:
```
git clone https://github.com/your-username/Sons-of-Thunder.git
```


## Database Setup

This guide will walk you through the process of setting up your database using the provided SQL files.

### Prerequisites

- PostgreSQL installed on your machine
- Access to a terminal/command line interface

### Steps

1. **Create the Database Schema**

   The `dbschema.sql` file contains the SQL commands to create the database and its tables. To run this file, open your terminal and navigate to the directory containing the `dbschema.sql` file. Then, run the following command:

   ```
   psql -f dbschema.sql
   ```

## Database Seeding

This guide will walk you through the process of seeding your database using the provided `seed.sql` file.

### Steps

1. **Seed the Database**

   The `seed.sql` file contains SQL `INSERT` commands to populate the `users` table with initial data. To run this file, open your terminal and navigate to the directory containing the `seed.sql` file. Then, run the following command:

   ```
   psql -f seed.sql
   ```
   
## Backend Setup

Setting up the backend is just as straightforward as the frontend. Here's what you need to do:

1. Open your terminal or command prompt.
2. Change the directory to the `backend` folder of your project:
```
cd path/to/backend
```
3. Install all the required dependencies with npm:
```
npm install
```
This command will install all the dependencies listed in the `package.json` file.

4. Before starting the backend server, ensure that PostgreSQL is running:
```
sudo service postgresql start
```
You might be prompted for your password.

5. Now, start the backend server using nodemon. The `-L` flag ensures that nodemon will poll for changes:
```
nodemon server.js -L
```

After these steps, your backend server should be up and running on port `http://localhost:3001`, listening for requests from the frontend.

## Frontend Setup

To get the frontend up and running, follow these simple steps:

1. Open your terminal or command prompt.
2. Change the directory to the `frontend` folder of the project:
```
cd path/to/frontend
```
3. Install all the required dependencies with npm:
```
npm install
```
This command fetches all the necessary packages defined in the `package.json` file and installs them locally.

4. Once the installation is complete, you can start the frontend application by running:
```
npm start
```

The application should now be accessible in your web browser at `http://localhost:3000`.

## Using the Blizzard API

This application uses the Blizzard API to fetch data about World of Warcraft characters. Here's a brief guide on how to use the Blizzard API in this application.

### Prerequisites

- A Blizzard account
- An API key from Blizzard

### Steps

1. **Get an API Key**

   To use the Blizzard API, you'll need an API key. You can get one by creating a new application on the [Blizzard Developer Portal](https://develop.battle.net/).

2. **Set up the API Key in the Application**

   Once you have your API key, you'll need to add it to your application. This application uses an environment variable to store the API key. Add a `.env` file to the root of your project and add the following line:

   ```bash
   BLIZZARD_API_KEY=your_api_key_here

## Environment Variables

This application uses a `.env` file to manage environment variables. Here's a brief guide on what to include in your `.env` file.

1. **NODE_ENV**: This should be set to the environment in which you are running your application. Possible values are `development`, `test`, or `production`.

2. **PORT**: This is the port number on which your application will run.

3. **SECRET_KEY**: This is a secret key used for encryption in your application.

4. **PATH**: This is the path to your PostgreSQL installation.

5. **DB_PASSWORD**: This is the password for your PostgreSQL database.

6. **DB_USER**: This is the username for your PostgreSQL database.

7. **DB_NAME**: This is the name of your PostgreSQL database.

8. **DB_NAME_TEST**: This is the name of your test database.

9. **HOST**: This is the host of your PostgreSQL database, usually `localhost`.

10. **DB_PORT**: This is the port number on which your PostgreSQL database is running.

11. **BLIZZARD_CLIENT_ID** and **BLIZZARD_CLIENT_SECRET**: These are your Blizzard API credentials. You can get these by creating an application on the [Blizzard Developer Portal](https://develop.battle.net/).

12. **SESSION_SECRET**: This is a secret key used for session management in your application.

13. **ENCRYPT_JWT_SECRET** and **JWT_SECRET**: These are secret keys used for JWT authentication in your application.

14. **BASE_URL**: This is the base URL of your application.

Please note that all these values should be kept secret and not committed to your version control system. It's recommended to use a `.env` file for development and environment variables for production.

## Technologies Used

This application uses a variety of technologies for both the server-side and client-side.

### Server-Side Technologies

1. **Node.js**: This is the primary runtime environment for the server-side of the application.
2. **Express.js**: This is the web application framework used for building the API.
3. **PostgreSQL**: This is the relational database system used for storing data.
4. **Passport.js**: This is the authentication middleware used for handling user authentication.
5. **Blizzard API**: This is used for fetching data about World of Warcraft characters.
6. **Axios**: This is used for making HTTP requests from the client-side to the server-side.
7. **JWT (JSON Web Tokens)**: This is used for handling token-based authentication.
8. **bcrypt.js**: This is used for hashing and comparing passwords.
9. **dotenv**: This is used for managing environment variables.

### Client-Side Technologies

1. **React.js**: This is the primary library used for building the user interface.
2. **Axios**: This is used for making HTTP requests from the client-side to the server-side.
3. **React Router**: This is used for handling routing in the application.


## Acknowledgments

Heartfelt gratitude goes out to Christian Feier, whose mentorship and unwavering support have been pivotal throughout the development of this project. His technical expertise and valuable insights have not only shaped this application but also enriched my personal growth and understanding. A sincere thank you to a remarkable friend and mentor.
