# Sons-of-Thunder

This project was built to provide those who play World of Warcraft and various other games to have a place to view their profile which includes achievements, stats, characters and more.
Our goal is to use this application to build a community for gamers by gamers.

## Getting Started

Instructions for setting up your project locally. These should include:

- Prerequisites: 
    - Nodejs version 16 or higher should be installed to run this project.
    - Clone the repo using ![Clone Repo](image.png)

- Installation: 
    - Navigate to the frontend folder and enter npm install to install the packages.
    - Install WSL (ubuntu), if using windows, to run ubuntu from the commandline
      Once ubuntu is installed use the command line to install postgresql.
    - Navigate to the backend folder and enter npm install to install the packages.

## Usage

Before running the server and client you will need to run postgresql for your db. 
Enter: sudo service postgresql start 

Note: You will most likely need a password.

In the backend directory within ubuntu enter command nodemon server.js to run the server locally.

In the frontend directory enter command npm start to run the client locally.

## Built With

We used React for the frontend and Express for the backend of the application.


## Acknowledgments

I want to acknowledge and thank Christian Feier, a friend and mentor, who has provided support and technical advice as I have worked on this project.