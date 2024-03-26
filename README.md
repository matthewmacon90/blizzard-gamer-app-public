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
