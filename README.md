# 🌟 Backend Setup Guide  

Welcome! This guide will help you configure and launch the backend server with ease. Let's get started! 🚀  

---

## 📋 Prerequisites  

Before running the backend, ensure the following tools are installed on your system:  

- **[Node.js](https://nodejs.org/)** (v14+ recommended)  
- **[npm](https://www.npmjs.com/)** (comes with Node.js)  
- **[MongoDB](https://www.mongodb.com/)** (local or cloud-based)  

---

## 🌐 Environment Variables  

To run the backend successfully, create a `.env` file in the root of your project and define these variables:  

| Variable      | Description                                                                 | Example                                  |  
|---------------|-----------------------------------------------------------------------------|------------------------------------------|  
| `COOKIE_SECRET` | A secret string for signing cookies securely. Use a strong random string.  | `super-secret-random-string`             |  
| `PORT`         | The port on which the server will run.                                      | `3000`                                   |  
| `MONGODB_URL`  | Connection string for your MongoDB database.                               | `mongodb+srv://username:password@cluster.mongodb.net/dbname` |  
| `JWT_SECRET`   | Secret key for signing and verifying JSON Web Tokens (JWT).                | `another-super-secret-string`            |  
| `EMAIL_USER`   | Email address used for sending server emails.                              | `your-email@example.com`                 |  
| `EMAIL_PASS`   | Password or app-specific password for the email address.                   | `email-password`                         |  

### 🔒 Security Tips  

- **DO NOT** commit your `.env` file to version control.  
- Use strong, unique values for `COOKIE_SECRET` and `JWT_SECRET`.  
- For production, use a secrets manager (e.g., AWS Secrets Manager or Vault).  

---

## 🚀 Installation  

Follow these steps to get your backend server running:  

1. **Clone the repository:**  
   ```bash  
   git clone <repository-url>  
   cd <repository-directory>  
