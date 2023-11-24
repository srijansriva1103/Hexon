# Cluster and Machine Management System

## Project Overview

The Cluster and Machine Management System is a Node.js and Express.js-based application designed for efficient management of clusters and machines in a distributed computing environment. This system provides a RESTful API to create, update, and delete clusters and machines. Additionally, it supports tag-based actions, allowing users to perform operations on groups of machines based on specified tags.

## Technologies Used

- Node.js
- Express.js
- Sequelize
- SQLite

## Project Structure

The project is organized into distinct directories:

- `config/`: Contains Sequelize configuration files.
- `models/`: Includes Sequelize models for Cluster, Machine, and Tag.
- `routes/`: Contains Express routes for Cluster and Machine actions.
- `index.js`: The main entry point of the application.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up the database by running migrations: `npx sequelize-cli db:migrate`.
4. Start the server: `npm start`.

## Usage

### Cluster Routes

- `POST /create`: Create a new cluster.
- `DELETE /delete/:id`: Delete a cluster and associated machines.

### Machine Routes

- `POST /create`: Create a new machine with optional tags.
- `POST /action`: Perform actions (start, stop, reboot) on machines based on tags.
- `DELETE /delete/:machineId`: Delete a machine.
