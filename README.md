# Front-End Cloud Book Writer Platform

## Overview

Welcome to the Front-End Cloud Book Writer Platform Demo! This React-based platform is designed to empower users to create, edit, and collaborate on books seamlessly.

## Core Features

### User Authentication

Implemented secure user authentication, enabling users to register, login, and manage their accounts seamlessly. We prioritize security, ensuring that user data remains protected at all times.

### Permissions & Roles

Supports two roles, including Author and Collaborator. Authors have the privilege to create new sections and subsections while adding book, while both Authors and Collaborators can edit them. Additionally, Authors can manage access by granting or revoking permissions for specific collaborators.

### Unlimited Sections and Subsections

Allows users to organize their books with unlimited sections and subsections. Utilizing a nested structure, users can create a hierarchy of content, enabling them to organize their thoughts effectively.

### Book Preview Functionality

Easily preview your book to envision the view of chapters and subchapters, resembling the index page of a book. Experience visualizations of the book preview firsthand.


## Tech Stack and Libraries

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A statically typed superset of JavaScript that helps catch errors and improve code quality.
- **Bootstrap**: A front-end framework for designing responsive and mobile-first websites.
- **Redux**: A predictable state container for managing application state.
- **Redux Persist**: A library for persisting Redux state to local storage.
- **Redux Toolkit**: The official Redux library for simplifying Redux setup and usage.
- **Sass**: A CSS preprocessor that adds features like variables, nesting, and mixins to CSS.
- **Formik**: A form library for React that helps with form management and validation.
- **Yup**: A schema validation library used in conjunction with Formik for form validation.
- **Axios**: A promise-based HTTP client for making requests to the server.
- **json-server**: A simple JSON-based mock server for development and testing purposes.
- **json-server-auth**: A plugin for json-server that provides authentication and authorization features.

## Running the Application

To run the application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install`.
4. Start the JSON server with authentication by running `npm run server`.
5. Start the development server with `npm start`.
6. Access the application in your browser at `http://localhost:3000`.

## Conclusion

In conclusion, this demo encapsulates robust and efficient functionality, spanning from seamless user authentication to role-based management, and a comprehensive book preview feature. With the ability to add books effortlessly and organize them with unlimited hierarchical chapters and subchapters, using react ecosystem.