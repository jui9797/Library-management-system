# Library Management API

A RESTful Library Management System built with **Express.js, TypeScript, MongoDB, and Mongoose**. This API allows users to manage books, track borrowing records, and monitor available book copies.

## Features

- Create, retrieve, update, and delete books.
- Filter books by genre.
- Sort books by selected fields in ascending or descending order.
- Limit the number of books returned.
- Borrow books with quantity validation.
- Automatically update available book copies.
- Prevent borrowing when insufficient copies are available.
- Generate borrowing summaries using MongoDB aggregation.
- Mongoose schema validation and middleware.
- Centralized error handling.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- dotenv
- tsx

## Project Structure

```text
src/
├── config/
│   └── db.ts
├── controllers/
│   ├── book.controller.ts
│   └── borrow.controller.ts
├── middlewares/
│   └── errorHandler.ts
├── models/
│   ├── book.model.ts
│   └── borrow.model.ts
├── routes/
│   ├── book.routes.ts
│   └── borrow.routes.ts
├── app.ts
└── server.ts

.env
.gitignore
package.json
tsconfig.json
README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/jui9797/Library-management-system
cd B5-A3
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB connection string.

### 4. Run the development server

```bash
npm run dev
```

Server runs at:

```text
http://localhost:5000
```

### 5. Build the project

```bash
npm run build
```

### 6. Start the production server

```bash
npm start
```

## API Endpoints

Base URL:

```text
http://localhost:5000
```

### Book Management

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/books`         | Create a new book      |
| GET    | `/api/books`         | Retrieve all books     |
| GET    | `/api/books/:bookId` | Retrieve a single book |
| PUT    | `/api/books/:bookId` | Update a book          |
| DELETE | `/api/books/:bookId` | Delete a book          |

### 1. Create a Book

**POST** `/api/books`

Request body:

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "FICTION",
  "isbn": "9780061122415",
  "description": "An inspirational novel.",
  "copies": 10,
  "available": true
}
```

### 2. Retrieve All Books

**GET** `/api/books`

Supported query parameters:

| Parameter | Description                 | Default |
| --------- | --------------------------- | ------- |
| `filter`  | Filter books by genre       | None    |
| `sortBy`  | Field to sort by            | None    |
| `sort`    | Sort order: `asc` or `desc` | `desc`  |
| `limit`   | Maximum number of results   | `10`    |

Examples:

```text
GET /api/books
GET /api/books?filter=FICTION
GET /api/books?sortBy=title&sort=asc
GET /api/books?limit=5
GET /api/books?filter=SCIENCE&sortBy=title&sort=asc&limit=5
```

### 3. Retrieve a Single Book

**GET** `/api/books/:bookId`

Example:

```text
GET /api/books/BOOK_ID
```

### 4. Update a Book

**PUT** `/api/books/:bookId`

Request body:

```json
{
  "title": "The Alchemist - Updated Edition",
  "copies": 15
}
```

### 5. Delete a Book

**DELETE** `/api/books/:bookId`

Example:

```text
DELETE /api/books/BOOK_ID
```

## Borrow Management

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| POST   | `/api/borrow` | Borrow books               |
| GET    | `/api/borrow` | Retrieve borrowing summary |

### 1. Borrow a Book

**POST** `/api/borrow`

Request body:

```json
{
  "book": "BOOK_OBJECT_ID",
  "quantity": 2,
  "dueDate": "2026-11-20"
}
```

Business rules:

- The requested book must exist.
- The requested quantity must be a positive integer.
- Sufficient copies must be available.
- Borrowed copies are deducted automatically.
- When copies reach zero, `available` becomes `false`.

### 2. Borrowing Summary

**GET** `/api/borrow`

Example response:

```json
{
  "success": true,
  "message": "Borrow summary retrieved successfully",
  "data": [
    {
      "totalQuantity": 3,
      "book": {
        "title": "The Alchemist",
        "isbn": "9780061122415"
      }
    }
  ]
}
```

The summary is generated using MongoDB aggregation with `$group`, `$lookup`, `$unwind`, and `$project`.

## Book Schema

| Field         | Type    | Description           |
| ------------- | ------- | --------------------- |
| `title`       | String  | Book title            |
| `author`      | String  | Author name           |
| `genre`       | String  | Book genre            |
| `isbn`        | String  | Unique ISBN           |
| `description` | String  | Optional description  |
| `copies`      | Number  | Available book copies |
| `available`   | Boolean | Availability status   |

Supported genres:

- `FICTION`
- `NON_FICTION`
- `SCIENCE`
- `HISTORY`
- `BIOGRAPHY`
- `FANTASY`

## Borrow Schema

| Field      | Type     | Description                 |
| ---------- | -------- | --------------------------- |
| `book`     | ObjectId | Reference to the Book model |
| `quantity` | Number   | Number of borrowed copies   |
| `dueDate`  | Date     | Borrowing due date          |

## Error Handling

The API includes centralized error handling for:

- Validation errors
- Invalid MongoDB ObjectIds
- Duplicate ISBN values
- Insufficient available copies
- Invalid requests
- Not found resources

Error response format:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Additional Implementation

- Mongoose pre-save middleware automatically updates book availability.
- Mongoose post-save middleware logs successful book creation or saving.
- A custom Mongoose static method handles book borrowing and copy deduction.
- MongoDB aggregation is used to generate borrowing summaries.
- Environment variables are used to protect database credentials.

## License

This project was developed as part of a Library Management System assignment.
