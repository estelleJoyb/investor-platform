# Investor Platform API

This is the backend API for an Investor Platform built with NestJS, TypeScript, and TypeORM. It allows users (entrepreneurs, investors, and admins) to manage projects, investments, user profiles, and more.

## Features

*   **User Management:**
    *   Registration and login with JWT authentication.
    *   Different user roles: entrepreneur, investor, and admin.
    *   Profile management (update profile).
    *   Password change.
*   **Project Management:**
    *   Create, read, update, and delete projects.
    *   Only entrepreneurs can create projects.
    * Only entrepreneurs and admins can delete projects.
*   **Interest Management:**
    *   Create, read, update, and delete interests.
    *   Associate interests with users.
    *   Get project recommendations based on user interests.
*   **Investment Management:**
    *   Investors can invest in projects.
    *   View individual investments.
    *   View investments for a specific project.
    *   Cancel an investment.
*   **Admin Panel:**
    *   View all users.
    *   Delete users.
    * View all investments.
*   **JWT Authentication:** Secure API endpoints with JWT.
* **Role-Based Access Control (RBAC)**: endpoints are protected with `RolesGuard`.

## Technologies Used

*   **NestJS:** A progressive Node.js framework.
*   **TypeScript:** A typed superset of JavaScript.
*   **TypeORM:** An ORM (Object-Relational Mapper) for TypeScript.
*   **MySQL:** A relational database management system.
*   **JWT (JSON Web Tokens):** For authentication.
*   **Passport:** For authentication.
*   **Class-Validator**: For request validation.
* **bcrypt**: For password encryption.
* **dotenv**: For environment variables.

## Getting Started

### Prerequisites

*   **Node.js** (v18 or later)
*   **npm** (or yarn)
*   **MySQL** server running

### Installation

1.  Clone the repository:

    ```bash
    git clone <your_repository_url>
    cd investor-platform
    ```
2. Copy the `.env.example` file to `.env` and change the values:
    ```bash
    cp .env.example .env
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

### Configuration

1.  **Database:**
    *   Edit the `.env` file to configure your MySQL database connection:
        ```
        DB_HOST=localhost
        DB_PORT=3306
        DB_USER=your_db_user
        DB_PASSWORD=your_db_password
        DB_NAME=investor_platform
        JWT_SECRET=your_jwt_secret
        ```
    * Create a database named `investor_platform` in your MySQL server.
2. **JWT**:
    * Update `JWT_SECRET` in the `.env`.

### Running the Application

* Development: npm run start:dev
* Production: npm run start:prod

The API will be accessible at `http://localhost:3000`.

## API Endpoints

### Authentication (`/auth`)

* `POST /auth/register`: Register a new user.
* `POST /auth/login`: Login and get a JWT.
* `POST /auth/logout`: Logout.

### Users (`/users`)

* `GET /users/profile`: Get the current user's profile.
* `PUT /users/profile`: Update the current user's profile.
* `PUT /users/change-password`: Change the current user password.
* `GET /users`: Get all users (admin only).
* `GET /users/:id`: Get a user by ID (admin only).
* `PUT /users/:id`: Update a user by ID (admin only).
* `DELETE /users/:id`: Delete a user by ID (admin only).

### Projects (`/projects`)

* `POST /projects`: Create a new project (entrepreneur only).
* `GET /projects`: Get all projects.
* `GET /projects/:id`: Get a project by ID.
* `PUT /projects/:id`: Update a project by ID.
* `DELETE /projects/:id`: Delete a project by ID (entrepreneur or admin only).

### Interests (`/interests`)

* `POST /interests`: Create a new interest.
* `GET /interests`: Get all interests.
* `GET /interests/:id`: Get an interest by ID.
* `PUT /interests/:id`: Update an interest by ID.
* `DELETE /interests/:id`: Delete an interest by ID.
* `POST /users/interests`: Add interests to a user.
* `GET /users/interests`: Get a user's interests.
* `GET /projects/recommended`: Get recommended projects based on the user's
  interests.

### Investments (`/investments`)

* `POST /investments`: Invest in a project (investor only).
* `GET /investments`: Get the current user's investments (investor only).
* `GET /investments/project/:id`: Get investments for a project.
* `DELETE /investments/:id`: Delete an investment (investor only).

### Admin (`/admin`)

* `GET /admin/users`: Get all users (admin only).
* `DELETE /admin/users/:id`: Delete a user by ID (admin only).
* `GET /admin/investments`: Get all the investments (admin only).

## Testing
* unit tests: npm run test
* e2e tests: npm run test:e2e
* testcoverage: npm run test:cov

## Curl examples
### Register a User (Entrepreneur)
curl -X POST http://localhost:3000/ auth/ register -H 'Content-Type: application/json' -d '{ "email": "entrepreneur@example. com" ,  "password": "EntrepreneurPassword123" ,  "firstName": "Entrepreneur", "lastName": "User", "role": "entrepreneur" }'

### Login
curl -X POST http://localhost:3000/ auth/ login -H 'Content-Type: application/json' -d '{ "email": "entrepreneur@example. com" ,  "password": "EntrepreneurPassword123"  }'

### Logout
curl -X POST http://localhost:3000/ auth/ logout

### Create a Project (with JWT)
curl -X POST http://localhost:3000/ projects -H 'Content-Type: application/json' -H 'Authorization: Bearer <your_jwt_token>' -d '{ "title": "My Project", "description": "A great project", "budget": 10000, "category": "Technology", "ownerId": "user_id_here" }'

### Get recommended project for this user (with JWT)
curl http://localhost:3000/ projects/ recommended -H 'Authorization: Bearer <your_jwt_token>'

### Create a Interest
curl -X POST http://localhost:3000/ interests -H 'Content-Type: application/json' -d '{ "name": "Technology" }'

### Add interests to the user.
curl -X POST http://localhost:3000/ users/ interests -H 'Authorization: Bearer <your_jwt_token>' -H 'Content-Type: application/json' -d '{ "interests": ["a2b5b7b0-f1e8-4093- a802- 626c30e0503d" ]  }'

### Create an Investment (with JWT)
curl -X POST http://localhost:3000/ investments -H 'Content-Type: application/json' -H 'Authorization: Bearer <your_jwt_token>' -d '{ "amount": 5000, "userId": "user_id_here", "projectId": "project_id_here" }'

### Get all users (with JWT)
curl http://localhost:3000/ admin/ users -H 'Authorization: Bearer <your_jwt_token>'

## Next Steps

* Add more tests.
* Improve error handling.
* Add more features.

## Support

If you encounter any issues or have questions, don't ask.

## License

This project is licensed under the MIT License.