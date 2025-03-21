# Portfolio Website

A full-stack portfolio website built with Node.js, Express, and MongoDB.

## Features

- Responsive design
- Project showcase with CRUD operations
- Contact form
- About me section
- RESTful API

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Template Engine**: EJS
- **Other Tools**: Mongoose, Dotenv, CORS

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB Atlas account or local MongoDB installation

### Installation

1. Clone the repository

   ```
   git clone <repository-url>
   cd portfolio
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables

   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

4. Start the development server

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
portfolio/
├── public/                 # Static files
│   ├── css/                # CSS files
│   ├── js/                 # JavaScript files
│   └── images/             # Image files
├── src/                    # Source code
│   ├── config/             # Configuration files
│   ├── controllers/        # Controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middlewares/        # Custom middlewares
│   ├── utils/              # Utility functions
│   └── app.js              # Express app entry point
├── views/                  # EJS templates
│   ├── layouts/            # Layout templates
│   └── partials/           # Reusable template parts
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a single project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

## Deployment

This application can be deployed to platforms like Heroku, Render, or AWS.

## License

This project is licensed under the ISC License - see the LICENSE file for details.
