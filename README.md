# kiss-and-shhhh

Full-stack MVP for a lounge management interface.

## Features

- **Customer Requests**: Track and manage customer orders.
- **Attendant View**: Assign tasks and track deliveries.
- **Inventory Management**: Manage stock and prices.
- **Payments & Expenses**: Record financial transactions.
- **Mock Retailrise Integration**: Simulation of ERP integration.

## Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, TypeScript
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL
- **DevOps**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose

### Running Locally

1. Clone the repository.
2. Run the application:

```bash
docker-compose up --build
```

This will start:
- Frontend at http://localhost:3000
- Backend at http://localhost:8000
- PostgreSQL database

The backend will automatically run migrations and seed the database with mock data.

### Running Tests

**Backend Unit Tests:**

```bash
cd backend
pip install -r requirements.txt
pytest
```

**E2E Tests (Playwright):**

```bash
cd frontend
npm install
npx playwright install
npx playwright test
```

## Folder Structure

- `backend/`: FastAPI application
  - `app/`: Application code
    - `api/`: API endpoints
    - `core/`: Configuration and security
    - `crud/`: Database operations
    - `db/`: Database session and base models
    - `integrations/`: Mock integrations (Retailrise)
    - `models/`: SQLAlchemy models
    - `schemas/`: Pydantic schemas
  - `tests/`: Unit tests
- `frontend/`: Next.js application
  - `src/`: Source code
    - `app/`: Pages and layout
    - `components/`: Reusable UI components
    - `lib/`: API client
- `tests/e2e/`: Playwright E2E tests

## Mock Retailrise Integration

The `backend/app/integrations/retailrise_mock.py` module simulates an external ERP system. It provides static responses for inventory, sales, and payments.

## Future Work

- Implement real Retailrise API integration.
- Add real authentication (replace mock token generation).
- Enhance UI with more interactive elements.
- Add more comprehensive tests.
