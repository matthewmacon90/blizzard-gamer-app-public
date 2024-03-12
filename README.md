Sons-of-Thunder
Sons-of-Thunder is a community-driven platform designed for gamers who indulge in the immersive world of World of Warcraft and other captivating games. It serves as a central hub for players to access their gaming profiles, showcasing their achievements, stats, characters, and more. Our mission is to foster a vibrant community built by gamers, for gamers.

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Ensure you have the following installed:

Node.js (version 16 or higher)
Git for cloning the repository
# Clone the repository
git clone https://github.com/your-username/Sons-of-Thunder.git

Installation
Frontend Setup: Navigate to the frontend directory and install dependencies.
cd frontend
npm install

Backend Setup:
For Windows users, install WSL (Ubuntu) to utilize Ubuntu in the command line.
Install PostgreSQL within Ubuntu.
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

Navigate to the backend directory and install dependencies.
cd backend
npm install

Usage
To use the application, follow these steps:

Start PostgreSQL:
sudo service postgresql start

Note: You may be prompted for a password.
Run the Server: Within the backend directory, start the server using nodemon.
nodemon server.js

Run the Client: In the frontend directory, start the client application.
npm start

Built With
React - A JavaScript library for building user interfaces.
Express - A web application framework for Node.js.
Acknowledgments
Special thanks to Christian Feier, a dear friend and mentor, whose support and technical guidance have been invaluable throughout the development of this project.
