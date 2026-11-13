# Notes App

A full-stack notes app built with the MERN stack (MongoDB, Express, React, Node.js).
Users can register, log in, and create, view, edit, and delete their own private notes.

## Features

- Create, read, update, and delete notes
- User registration and login with JWT authentication
- Passwords hashed with bcrypt
- Each user can only access their own notes
- Input validation and centralized error handling
- React frontend with loading and error states

## Tech stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas with Mongoose
- **Auth:** JSON Web Tokens, bcryptjs

## Project structure

```
Notes App/
  Server/
    Controllers/    request logic
    Middleware/     auth, ID validation, error handler
    Models/         Mongoose schemas (User, Note)
    Routes/         URL to controller mapping
    index.js        app setup and database connection
  client/
    src/
      components/   NoteForm, NoteCard
      App.jsx
```

## Getting started

### Prerequisites

- Node.js 18 or higher
- A MongoDB Atlas cluster (or a local MongoDB)

### Backend

```bash
cd Server
npm install
```

Create a `.env` file in `Server/`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_string
```

Then start the server:

```bash
npm run dev
```

The API runs on `http://localhost:5000`.

### Frontend

```bash
cd client
npm install
npm run dev
```

The app runs on `http://localhost:5173`.

## API endpoints

### Auth

| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| POST   | `/api/auth/register` | Create an account    |
| POST   | `/api/auth/login`    | Log in, returns JWT  |

### Notes (require `Authorization: Bearer <token>`)

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| GET    | `/api/notes`      | List your notes          |
| GET    | `/api/notes/:id`  | Get one note             |
| POST   | `/api/notes`      | Create a note            |
| PUT    | `/api/notes/:id`  | Update a note            |
| DELETE | `/api/notes/:id`  | Delete a note            |

## What I learned

- Building a REST API with Express: routing, middleware, route parameters
- Modeling data with Mongoose schemas
- Structuring a backend into routes, controllers, and middleware
- Password hashing and token-based authentication
- Connecting a React frontend to an API with `fetch`

## Status

The backend is complete. The React frontend does not send login tokens yet, so
it needs login and register pages before it works with the protected routes.