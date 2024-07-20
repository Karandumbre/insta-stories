
# Instagram Stories Clone

This project is an Instagram Stories clone built with React, Redux, and Apollo Client for the frontend, and Node.js for the backend. It includes a story modal that displays user stories and handles story viewing, progression, and navigation through user stories.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Main folder

1. Install backend dependencies
    ```bash
    yarn install:backend
    ```

2. Install backend dependencies
    ```bash
    yarn install:frontend
    ```

3. Start the backend and frontend server
    ```base
    yarn dev
    ```

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   yarn install
   ```

3. Create an `.env` file in the backend directory and add your environment variables:
   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. Run the backend server:
   ```bash
   yarn start
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   yarn install
   ```

3. Create an `.env` file in the frontend directory and add your environment variables:
   ```env
   REACT_APP_API_URL=your_api_url
   ```

4. Run the frontend development server:
   ```bash
   yarn start
   ```

## Usage

### Running the Project

To run the project, follow the installation steps above for both the backend and frontend. Ensure the backend server is running before starting the frontend.

### Viewing Stories

- Click on a user's profile picture to open their stories.
- Click on the right side of the story image to go to the next story.
- Click on the left side of the story image to go to the previous story.

### Mutations and State Management

- Stories are marked as viewed using the `VIEW_STORY_MUTATION`.
- The story viewed state is managed using Redux.

## Features

- Display user stories with a progress bar.
- Navigate through stories by clicking on the left or right side of the story image.
- Mark stories as viewed and update the state using GraphQL mutations.
- Automatically progress to the next story or next user's stories.

## Project Structure

\```
instagram-stories-clone/
│
├── backend/
│   ├── build/
│   ├── node_modules/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── jsconfig.json
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
│
├── node_modules/
├── .gitignore
├── package.json
└── yarn.lock
\```

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For state management.
- **Apollo Client**: For managing GraphQL queries and mutations.
- **Material-UI**: For UI components.
- **GraphQL**: For API queries and mutations.
- **Node.js**: For the backend server.
- **Express**: For handling backend routes.
- **MongoDB**: As the database.
- **Yarn**: For package management.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/my-new-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-new-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
