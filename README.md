# Sons-of-Thunder

Welcome to the Sons-of-Thunder project! This platform is designed for the passionate gamers of World of Warcraft and other games, offering a personalized space to showcase your gaming achievements, stats, characters, and more. Join us in fostering a vibrant community built by gamers, for gamers.

## Getting Started

Follow these instructions to set up the project locally and embark on your development journey.

### Prerequisites
Before you begin, make sure you have the following installed:

### Git Bash
- Download the latest version of Git for Windows from the [official Git website](https://git-scm.com/downloads).
- Run the downloaded installer and follow the on-screen instructions to complete the installation.

## Windows Subsystem for Linux (WSL) with Ubuntu

### Installing WSL with Ubuntu
1. Open PowerShell as Administrator and run:

```
wsl --install
```

2. Restart your computer when prompted.
3. Launch Ubuntu from the Start menu and set up your new UNIX username and password.

For detailed instructions, visit the [Microsoft Learn WSL Installation Guide](https://learn.microsoft.com/en-us/windows/wsl/install).

## Node.js and Node Version Manager (NVM)

### Installing Node.js
1. After setting up WSL, open the Ubuntu terminal.
2. Update your package index:
```
sudo apt update
```
3. Install Node.js:
```
sudo apt install nodejs
```
4. Confirm the installation with:
```
node -v
```
For more details, check out the [Node.js Installation Guide](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs).

### Installing NVM
1. In the Ubuntu terminal, install NVM using the following curl command:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
2. Close and reopen the terminal.
3. Install the latest version of Node.js with NVM:
```
nvm install node
```

For a complete guide, refer to the [NVM Install Guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).

## PostgreSQL

### Installing PostgreSQL
1. Update your package index:
```
sudo apt update
```
2. Install PostgreSQL:
```
sudo apt install postgresql postgresql-contrib
```
3. Start the PostgreSQL service:
```
sudo service postgresql start
```
4. Optionally, secure PostgreSQL by setting a password for the `postgres` user:
```
sudo -u postgres psql -c “ALTER USER postgres PASSWORD ‘newpassword’;”
```

For a step-by-step guide, visit the [PostgreSQL Installation Documentation](https://www.postgresql.org/docs/current/tutorial-install.html).

### Cloning Repo
- Clone the repository to your local machine:
```
git clone https://github.com/your-username/Sons-of-Thunder.git
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

## Technologies
The Sons-of-Thunder application is engineered with a robust stack to ensure a seamless and dynamic user experience:

- **Frontend Development**: Crafted with React, a declarative and efficient JavaScript library for building user interfaces. React's component-based architecture facilitates the development of interactive UIs, making it an ideal choice for our application's frontend.

- **Backend Development**: Powered by Express, a fast, unopinionated, minimalist web framework for Node.js. Express provides a thin layer of fundamental web application features, enabling us to create a powerful API for our application's backend.


## Acknowledgments

Heartfelt gratitude goes out to Christian Feier, whose mentorship and unwavering support have been pivotal throughout the development of this project. His technical expertise and valuable insights have not only shaped this application but also enriched my personal growth and understanding. A sincere thank you to a remarkable friend and mentor.
