# Full-Stack-Project
# Phertek – Full-Stack Event Management Web Application

Phertek is a full-stack web application designed to simplify event and meetup management. Using the MVC architecture, Phertek enables users to create, manage, RSVP to, and interact with events in a secure and intuitive interface. It was developed over five major project phases, each expanding on functionality, user experience, and security.

---

## 🚀 Features

- **User Authentication & Authorization**
  - Secure user registration and login with password hashing (bcrypt)
  - Persistent session tracking with MongoDB-backed sessions
  - Role-based access control to restrict edit/delete privileges to event creators

- **Event Management**
  - Create, view, edit, and delete events
  - Events include details such as title, category, host, date/time, location, and image
  - Events are organized by categories, dynamically generated from database

- **RSVP Functionality**
  - Authenticated users can RSVP to events hosted by others
  - RSVP options: YES, NO, MAYBE
  - Real-time update of RSVP status counts per event
  - Users can view their RSVP history on their profile page

- **Secure Form Validation**
  - Server-side input validation using `express-validator`
  - Input sanitation to prevent XSS
  - Custom validation logic for dates, categories, and password policies

- **Flash Messaging**
  - Instant success/error feedback for user actions (login, form submission, etc.)

- **Error Handling**
  - Graceful handling of invalid routes, failed validations, and unauthorized access
  - Custom error pages with status codes (400, 401, 500)

- **Dynamic Frontend**
  - Views built using EJS templating engine with partials for consistent layout
  - Responsive and accessible design for seamless navigation

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript, EJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas, Mongoose
- **Authentication**: bcrypt, express-session, connect-mongo
- **Middleware**: express-validator, multer (for image upload)
- **Hosting & Deployment**: Local for development, can be deployed to platforms like Heroku or Render

---

