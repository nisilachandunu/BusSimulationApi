# Real-Time Bus Tracking System API

This repository contains the codebase for a RESTful Web API developed as part of the NB6007CEM - Web API Development coursework.

## Student Information

- **Student ID**:YR4COBSCCOMP232P-016

## Project Overview

The API provides a secure, open-standards-based solution to monitor and manage bus locations, routes, and scheduled trips across Sri Lanka. It supports three key stakeholders:

- **NTC (Admin)**: Full CRUD operations and analytics.
- **Bus Operators**: Manage fleet locations and schedules.
- **Commuters**: Real-time tracking and route information.

## Technologies Used

- **Backend**: Node.js (ES6+), Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Validation**: Joi
- **Documentation**: Swagger (OpenAPI spec)
- **Version Control**: Git, GitHub
- **Deployment**: Render.com (or alternative PaaS)

## Installation and Setup

1. **Clone the Repository**:
   bash
   git clone https://github.com/yourusername/bus-tracking-api.git
   cd bus-tracking-api

2.**Install Dependencies**
npm install

3.**Configure Environment Variables**:

Create a .env file in the root directory.
Add the following (replace with your values):
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/busdb?retryWrites=true&w=majority
PORT=5000

4.**Run the Application**
npm run dev
