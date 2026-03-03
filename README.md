## 📦 E-Commerce Web Application — README

### 🛍️ Project Description

**AWS and React+vite**

A modern full-stack **E-Commerce Web Application** built with a premium UI and real-time features. The platform allows users to browse products, manage carts, place orders, and communicate with customer support via a live chat system. An admin panel enables efficient management of orders and customer queries.

This project demonstrates real-world architecture using cloud services, state management, and responsive design — similar to production-grade shopping platforms.

---

## ✨ Features

### 👤 User Side

* 🔐 Authentication (Signup / Login)
* 🛒 Add to Cart & Quantity Management
* 📦 Place Orders
* 📜 Order History & Status Tracking
* 💬 Live Customer Support Chat
* 📱 Fully Responsive UI
* 🎯 Product Browsing with Discounts & Ratings

### 🛠️ Admin Side

* 📊 Admin Dashboard
* 📦 View & Update Orders
* 👥 Manage Customer Queries
* 💬 Real-Time Chat with Users
* 📈 Order Status Control (Placed, Shipped, Delivered, Cancelled)

---

## ⚡ Tech Stack

### Frontend

* **React.js**
* **Redux Toolkit**
* **React Router**
* **CSS (Custom Premium UI)**
* **React Icons**

### Backend & Cloud

* **AWS Amplify**
* **GraphQL API**
* **AWS AppSync**
* **DynamoDB**
* **AWS Lambda**
* **Real-time Subscriptions**

---
## Live Demo 

url: https://main.d1kusytxhghfnb.amplifyapp.com/

---
## 🔑 Demo Credentials 

You can use these as test users.

### 👨‍💼 Admin

```
Username: admin@example.com
Password: Admin@1234
```

### 👤 User

```
create your own userId and password with a valid email
--> Use valid email as user needs to confirm and verify there email

```

---
## Screenshots

<img width="1349" height="605" alt="image" src="https://github.com/user-attachments/assets/ec1b338c-0b5b-4881-86d1-5bd9be2c325a" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/9b620855-4286-4f2e-88f2-ad9002e26481" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/a0c28881-55bf-450a-8ce6-d9f3efba892b" />
<img width="291" height="446" alt="image" src="https://github.com/user-attachments/assets/8cdbd12e-a328-4b4d-802f-7c35be4e9707" />
<img width="1346" height="597" alt="image" src="https://github.com/user-attachments/assets/4f353933-6dae-4283-997b-928a1a25ee2b" />
<img width="1346" height="597" alt="image" src="https://github.com/user-attachments/assets/4244c8b9-9825-4bb7-a8c9-50fd0a4973ad" />
<img width="290" height="408" alt="image" src="https://github.com/user-attachments/assets/6fdcf82e-afc9-43b3-9c9b-4bdbc2f5ab4b" />

---

## 💬 Real-Time Chat System

Includes a fully functional customer support system:

* User sends message → Admin receives instantly
* Admin replies → User sees in real time
* Unread message indicators
* Infinite scroll for older messages
* Avatar & sender identification
* Template greeting on connection

---

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/khushidesaiiiii/aws-ecommerce.git
cd aws-ecommerce
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Configure Amplify

```bash
amplify configure
amplify init
amplify pull
```

---

### 4️⃣ Run Development Server

```bash
npm run dev
```

App will run on:

```
http://localhost:5173
```

---

## 🎯 Use Cases

* Learning full-stack cloud development
* Real-time applications with GraphQL subscriptions
* Portfolio project for interviews
* Scalable production-ready architecture

---

## 📱 Responsive Design

Optimized for:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

---

# 🔄 CI/CD Documentation

## 📌 CI/CD Overview

This project uses **Git-based Continuous Integration and Continuous Deployment (CI/CD)** with AWS Amplify.

Whenever code is pushed to the connected GitHub branch, AWS Amplify automatically:

1. Clones the repository
2. Installs dependencies (`npm install`)
3. Builds the application (`npm run build`)
4. Deploys the production-ready build
5. Hosts the app using AWS CloudFront

This ensures automatic deployment without manual steps.

---

## 🏗️ CI/CD Architecture

```
Developer → GitHub → AWS Amplify → CloudFront CDN → End Users
```

---

## 🌿 Branch Strategy

| Branch  | Environment | Purpose                |
| ------- | ----------- | ---------------------- |
| dev     | Development | Testing new features   |
| staging | Staging     | Pre-production testing |
| main    | Production  | Live application       |

Each branch triggers a separate deployment environment.

---

## ⚙️ Build Configuration

Amplify uses the following build process:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

---

## 🔐 Environment Variables

Environment variables are configured inside AWS Amplify Console.

Example variables:

* VITE_APPSYNC_URL
* VITE_APPSYNC_API_KEY
* VITE_COGNITO_USER_POOL_ID
* VITE_COGNITO_CLIENT_ID

These variables are injected securely during build time.

Local `.env` files are not used in production deployment.

---

## 🚀 Deployment Workflow

1. Developer pushes code to GitHub.
2. Amplify detects changes.
3. Amplify runs automated build.
4. Build artifacts are deployed.
5. CloudFront distributes content globally.

No manual deployment required.

---

## 🔮 Future Improvements

* Online payments integration
* Product reviews & ratings
* Notifications system
* Inventory management
* Multi-admin roles
* Analytics dashboard

---

## 📄 License

This project is for educational and portfolio purposes.

---

## 👨‍💻 Author

Built with ❤️ as a full-stack e-commerce solution.

---


