# NomadHomes

NomadHomes is a full-stack web application for property listing and accommodation discovery. The project allows users to create, manage, browse, and review rental listings through a server-rendered web interface.

The application was developed to strengthen practical understanding of backend development, database integration, authentication, session management, and deployment workflows using the Node.js ecosystem.

---

## Features

- User authentication and authorization
- Create, edit, and delete property listings
- Image upload and storage support
- Review and rating system
- Session-based login persistence
- Form validation and error handling
- Flash messaging for user feedback
- Responsive UI using Bootstrap
- MongoDB database integration
- RESTful routing structure

---

## Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Frontend

- EJS
- Bootstrap
- CSS

### Authentication & Sessions

- Passport.js
- Express Session
- Connect-Mongo

### Additional Tools & Libraries

- Joi (validation)
- Multer (file uploads)
- Cloudinary (image hosting)
- Method-Override
- Connect-Flash
- Dotenv

---

## Project Structure

The project follows a modular structure with separation of concerns between routes, models, middleware, views, and utility functions.

```bash
NomadHomes/
│
├── controller/
│   ├── listingController.js
│   ├── reviewController.js
│   └── userController.js
│
├── init/
│   ├── data.js
│   └── index.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   │   ├── rating.css
│   │   └── style.css
│   ├── images/
│   └── js/
│       ├── map.js
│       └── script.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── utils/
│   ├── expressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── includes/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   │
│   ├── layout/
│   │   └── boilerplate.ejs
│   │
│   ├── allListings.ejs
│   ├── editForm.ejs
│   ├── Error.ejs
│   ├── home.ejs
│   ├── loginForm.ejs
│   ├── newForm.ejs
│   ├── reviewForm.ejs
│   ├── show.ejs
│   └── signupForm.ejs
│
├── .env
├── .gitignore
├── app.js
├── cloudConfig.js
├── middleware.js
├── package-lock.json
├── package.json
└── schema.js
```

---

## What I Learned From This Project

This project helped me move beyond basic frontend development and gain practical experience in full-stack web development.

### Backend Development

- Building RESTful routes using Express.js
- Structuring a scalable Node.js application
- Handling middleware and request flow

### Database Integration

- Designing MongoDB schemas using Mongoose
- Performing CRUD operations
- Managing relationships between collections

### Authentication & Security

- Implementing authentication using Passport.js
- Managing sessions with MongoDB-backed storage
- Protecting routes with authorization middleware

### File Handling & Cloud Services

- Uploading and managing images using Multer and Cloudinary
- Working with environment variables securely

### Error Handling & Validation

- Server-side validation using Joi
- Custom error handling middleware
- Improving application reliability and debugging skills

### Deployment & Production Concepts

- Connecting applications with MongoDB Atlas
- Managing deployment configurations
- Understanding environment-based setups and dependency issues

---

## Installation

Clone the repository:

```bash
git clone https://github.com/TheNidhishGarg/NomadHomes.git
```

Move into the project directory:

```bash
cd NomadHomes
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add the required environment variables:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Run the application:

```bash
node app.js
```

---

## Future Improvements

- Search and filtering functionality
- Booking system integration
- Payment gateway support
- Interactive maps and geolocation
- Improved mobile responsiveness
- Admin dashboard
- API version for frontend frameworks

---

## Live Deployment

Application Link: [https://nomadhomes.onrender.com/](https://nomadhomes.onrender.com/)

---

## Author

Nidhish Garg

GitHub: [https://github.com/TheNidhishGarg/NomadHomes](https://github.com/TheNidhishGarg/NomadHomes)
