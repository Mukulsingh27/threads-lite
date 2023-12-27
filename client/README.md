# Client

Our client-side is the heart of the action, built with React, making it both dynamic and user-friendly. We've crafted a sleek interface using Apollo Client for smooth GraphQL queries and mutations, while React Router ensures seamless navigation. Let's dive into the simplicity of our structure.

## Folder Structure

The client-side application has the following folder structure:

-   `src/`: This is where all the React components, GraphQL queries/mutations, and SCSS files live.
-   `public/`: This is where the static files like index.html live.
-   `build/`: This is where the production build is created.

### Styling with SCSS

We use SCSS for styling the application. SCSS is a CSS preprocessor that allows us to use features that don't exist in CSS yet like variables, nesting, mixins, inheritance, and more.

## Screenshots

### Home Page

-   Displays a list of user-created threads
-   Pagination for loading more threads efficiently with 10 threads per page.

### Login Page

-   Login page ensures secure access to the heart of the application.

### Signup Page

-   Embark on the journey by registering as a new user.
-   An email verification process to ensure authenticity.

### Verify Page

-   A dedicated space to verify user accounts.

### Profile Page

-   View and edit user profile information
-   Create new threads
-   Manage existing threads (edit/delete)

### 404 Page

-   Custom 404 page for handling invalid routes
