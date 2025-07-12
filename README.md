# 🧠 ThinkSync - A Full-Stack Blogging Platform

https://thinksync-think-write-sync.onrender.com

**ThinkSync** is a modern, full-stack blogging platform that allows users to express ideas, share knowledge, and engage with content across categories in a seamless digital environment.

---

## 🔧 Tech Stack

- **Frontend**: React.js, Material UI  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT  
- **Image Hosting**: Cloudinary  
- **API Testing**: Postman  

---

## 🚀 Overview

ThinkSync streamlines the blogging experience for users with a clean interface and feature-rich environment, enabling them to create, update, and interact with content effortlessly.

---

## 🔑 Features

### 👤 Users

- Register and securely log in with JWT-based authentication  
- Create and manage blogs with support for rich content and image uploads  
- Filter blogs based on category/section  
- View, comment on, and engage with blog posts  
- Edit or delete personal blog posts  

### 🖼️ Blogs

- Create detailed blogs with title, content, section, and image  
- Upload images directly using Cloudinary integration  
- Browse all public blogs by all users  
- Filter content by section or category for easier discovery  

### 💬 Comments

- Add comments to any blog post  
- View discussions under blog posts  
- Encourage community interaction  

---

## 📦 API & Testing

All RESTful API endpoints are thoroughly tested using **Postman**. The architecture supports full CRUD operations for users, blogs, and comments.

---

## 📂 Folder Structure

- /client => React frontend with routing and Material UI components
- /server => Node.js backend with Express routes and MongoDB models
- /models => Mongoose schemas for Users, Blogs, Comments
- /routes => Route files for blogs, auth, comments
- /utils => JWT and middleware utilities


---

## 📈 Future Improvements

- Rich-text editor integration  
- Like/bookmark functionality  
- Admin dashboard for moderation  
- User profile pages with their blogs  

---

## 🧪 Getting Started

### Prerequisites

- Node.js & npm  
- MongoDB  
- Cloudinary account for image uploads  

### Setup

1. Clone the repository  
2. Configure your `.env` file with:
    ```
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    CLOUDINARY_CLOUD_NAME=<your_cloud_name>
    CLOUDINARY_API_KEY=<your_api_key>
    CLOUDINARY_API_SECRET=<your_api_secret>
    ```
3. Install dependencies:
    ```bash
    cd server
    npm install
    cd ../client
    npm install
    ```
4. Start the development servers:
    ```bash
    cd server
    npm run dev
    cd ../client
    npm start
    ```

5. Open your browser at `http://localhost:3000`

---

## 🧠 Author

Developed by [Aman Kumar](https://github.com/amankumar0724)

---

## 📬 Contact

Feel free to reach out via GitHub for feedback or collaboration opportunities.

