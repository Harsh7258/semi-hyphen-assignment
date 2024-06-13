# Blog API Documentation

## Overview

This is the documentation for the Blog API, which allows users to create, read, update, and delete blog posts. The API is built using Node.js and Express.js, with authentication handled via JWT. Firebase is used for data storage, and Postman is used for API testing and **[Blog API documentation](https://documenter.getpostman.com/view/31106866/2sA3XPENvS)**.

## Technologies Used

- `Node.js`: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- `Express.js`: A fast, unopinionated, minimalist web framework for Node.js.
- `JWT (JSON Web Tokens)`: A compact, URL-safe means of representing claims to be transferred between two parties.
- `Firebase`: A platform developed by Google for creating mobile and web applications.
- `Postman`: A collaboration platform for API development.

## NPM Packages

- `express`: A minimal and flexible Node.js web application framework.
- `express-rate-limit`: Basic rate-limiting middleware for Express.
- `bcryptjs`: A library to help you hash passwords.
- `jsonwebtoken`: An implementation of JSON Web Tokens.
- `xss-clean`: Middleware to sanitize user input coming from POST body, GET queries, and url params.
- `firebase-admin`: The Firebase Admin Node.js SDK enables access to Firebase services from privileged environments.

## Firebase Configuration

Add Firebase database collection snapshots

### Blogs collection

![blogs Page](/assests/images/blogs.png)

### Users collection

![users Page](/assests/images/users.png)

### Blacklist token collection

![blacklist Page](/assests/images/blacklist.png)

## Getting Started

### Installation

Clone the repository:

```
git clone https://github.com/Harsh7258/semi-hyphen-assignment.git
cd blog-api
```

### Install dependencies:

```
npm install
```

### Environment Variables

Create a .env file in the root directory and add the following environment variables:

```
FIREBASE_PROJECT_ID=<your-firebase-project-id>
FIREBASE_PRIVATE_KEY=<your-firebase-private-key>
FIREBASE_CLIENT_EMAIL=<your-firebase-client-email>
JWT_SECRET=<your-jwt-secret>
PORT=3000
```

Running the API
Start the development server:

```
npm start
or
npm run dev
```

## API Endpoints

### Authentication

### Signup

URL: `/blogapi/v1/user/signup`
Method: `POST`
Description: Registers a new user.
Body Parameters:

> > {
> > "username": "string",
> > "password": "string"
> > }

![Signup Page](/assests/images/signup.png)

### Login

URL: `/blogapi/v1/user/login`
Method: `POST`
Description: Logs in a user and returns a JWT.

> {
>
> > "username": "string",
> > "password": "string"
> > }

![Login Page](/assests/images/login.png)

### Logout

URL: `/blogapi/v1/user/logout`
Method: `POST`
Description: Logs out a user and blacklist a JWT.

> {
>
> > "message": "succesfully loggedout"
> > }

![Logout Page](/assests/images/logout.png)

### Delete user

URL: `/blogapi/v1/user/deleteUser`
Method: `POST`
Description: Deletes user by email

### Blogs

### Create Post

URL: `/blogapi/v1/blog`
Method: `POST`
Description: Creates a new blog post.
Headers:

> {
>
> > "Authorization": "Bearer <token>"
> > }

> {
>
> > "title": "string",
> > "content": "string"
> > }

![create blog](/assests/images/createblog.png)

### Get All Posts

URL: `/blogapi/v1/blog`
Method: `GET`
Description: Retrieves all blog posts.

![Get all blogs](/assests/images/getallblogs.png)

### Get Post by ID

URL: `/blogapi/v1/blog/:id`
Method: `GET`
Description: Retrieves a blog post by ID.
Headers:

> {
>
> > "Authorization": "Bearer <token>"
> > }

![get blog by id](/assests/images/blogbyid.png)

### Update Post

URL: `/blogapi/v1/blog/:id`
Method: `PUT`
Description: Updates a blog post by ID.
Headers:

> {
>
> > "Authorization": "Bearer <token>"
> > }

> {
>
> > "title": "string",
> > "content": "string"
> > }

![update blog](/assests/images/updateblog.png)

### Delete Post

URL: `/blogapi/v1/blog/:id`
Method: DELETE
Description: Deletes a blog post by ID.
Headers:

> {
>
> > "Authorization": "Bearer <token>"
> > }

![delete Page](/assests/images/deleteblog.png)

## NPM Packages Description

- `express`: The foundation of our API, allowing us to handle routing and middleware.
- `express-rate-limit`: Protects our API from brute-force attacks by limiting repeated requests.
- `bcryptjs`: Secures user passwords by hashing them before storing them in the database.
- `jsonwebtoken`: Manages the creation and verification of JSON Web Tokens for secure user authentication.
- `xss-clean`: Prevents XSS attacks by sanitizing user input.
- `firebase-admin`: Provides admin access to Firebase services for secure and efficient data management.
- `Testing with Postman`
  Use Postman to test the API endpoints. You can import the Postman collection provided in the postman directory of this repository.

## Contributing

Fork the repository

```
Create a new branch (git checkout -b feature-branch)
Commit your changes (git commit -am 'Add new feature')
Push to the branch (git push origin feature-branch)
Create a new Pull Request
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
