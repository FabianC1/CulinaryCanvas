# CulinaryCanvas

CulinaryCanvas is an online recipe sharing platform where users can create accounts, upload their own recipes, and share their culinary creations with the community. Users can rate recipes with stars, leave reviews, follow other cooks, and explore a variety of dishes submitted by fellow food enthusiasts.

## Features

- User registration and login system
- Upload and manage your own recipes with images
- Rate and review recipes from other users
- Follow your favorite cooks to keep track of their latest recipes
- Interactive UI built using modals for seamless user experience

## About

This website is designed to create a vibrant community for sharing and discovering recipes. The focus was on creating an intuitive interface with dynamic modals for actions like adding recipes, rating, and following users.

---

## Backend Overview

The CulinaryCanvas backend is built with **Express.js** and uses **MongoDB** for data storage. It manages user accounts, recipe uploads, sessions, and user interactions.

### Key Features:

- **User management:** Register, login, logout with session support
- **Recipe management:** Users can upload recipes with images and descriptions
- **Data storage:** User and recipe data are stored securely in MongoDB collections
- **File uploads:** Profile pictures and recipe images are stored in a local `uploads` folder
- **Session-based authentication:** Access control for protected routes (e.g., fetching user data, recipes count)
- **REST API endpoints:** Exposed under `/M00860030` namespace

---

## Testing

Tests are written using **Mocha** and **Chai** with the `chai-http` plugin to simulate HTTP requests and verify responses. The tests cover:

- User endpoints (`/getAllUsers`, `/AddUser`, `/login`, `/logout`)
- Recipe-related endpoints (`/getUserRecipesCount`, `/uploadImageAndDescription`)
- Proper status codes (e.g., 200, 401) and expected response payloads

---

*Feel free to contribute or suggest improvements!*
