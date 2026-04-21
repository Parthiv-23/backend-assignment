# Rate-Limited API Service

This is a robust Node.js backend designed to handle high-frequency API requests with an intelligent sliding window rate limiter. Built with Express and MongoDB, it balances high-performance in-memory validation with persistent metrics for long-term auditing.

## Why this exists
In many production environments, simple fixed-window rate limiters are vulnerable to "bursting" at the edge of the window. This project employs a **Sliding Window Log** algorithm to provide a smoother, fairer experience for users while ensuring the system remains protected.

## Technical Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Documentation**: Swagger / OpenAPI 3.0
- **Validation**: In-memory sliding window

---

## Getting Started

### 1. Prerequisites
You'll need Node.js installed on your machine and a running MongoDB instance (local or Atlas).

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rate_limit_db
```

### 3. Installation & Run
```bash
# Install dependencies
npm install

# Start the server
npm start
```
The server will be live at `http://localhost:3000`.

---

## API Documentation

We use Swagger for interactive API documentation. Once the server is running, you can explore and test the endpoints directly:

🔗 **Interactive Docs**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Core Endpoints

#### `POST /request`
Processes an incoming payload if the user is within their rate limit.
- **Limit**: 5 requests per 60-second sliding window.
- **Body**: `{ "user_id": "string", "payload": "any" }`

#### `GET /stats`
Retrieves usage metrics for all users, including total, successful, and blocked request counts.

---

## Architectural Decisions

- **In-Memory Limiter**: We use a `Map` of timestamp arrays for request validation. This ensures that the rate-limiting check doesn't become a bottleneck for the system.
- **Asynchronous Persistence**: Request statistics are recorded in MongoDB in the background. This allows the API to remain responsive even if there's minor latency in the database write.
- **Standardized Responses**: All API outputs follow a strict `{ success, message, data }` structure, making it predictable for frontend consumption.
- **Separation of Concerns**: Logic is strictly divided between Controllers (HTTP handling), Services (Business logic), and Models (Data structure).

## Project Structure
```text
src/
├── config/      # Database, Constants, and Swagger configuration
├── controllers/ # HTTP request handlers
├── models/      # Mongoose schemas
├── routes/      # Express route definitions
├── services/    # Business logic (Limiter & Stats tracking)
├── store/       # Ephemeral in-memory storage
├── utils/       # Shared utilities (Response & Time helpers)
├── swagger/     # OpenAPI JSON specifications
```

---
