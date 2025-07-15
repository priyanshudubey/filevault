# 🔐 FileVault

A secure, modern file management system built with React and Firebase. Upload, manage, and share your files with a beautiful, responsive interface.

## 🌟 Features

- **Secure Authentication** - Email/password authentication with Firebase Auth
- **File Upload & Management** - Drag & drop file uploads with Firebase Storage
- **Real-time Database** - User data stored in Firestore
- **Responsive Design** - Beautiful UI with Tailwind CSS
- **Protected Routes** - Secure access to dashboard and user files
- **Modern Tech Stack** - React 19, Vite, Firebase v11, React Router v7

## 🚀 Live Demo

🔗 **[Live URL - ]** - [FileVault](https://filevault-d79d3.web.app/)

## � YouTube Development Series

🎥 **[Watch the Live Development Process]** - [Video](https://youtu.be/V7bYbypySpE)
I developed this entire FileVault application live on my YouTube channel! Watch the complete development process, learn React, Firebase, and modern web development techniques step by step.

**What you'll learn:**

- Setting up React with Vite
- Firebase Authentication implementation
- Firestore database integration
- File upload with Firebase Storage
- Responsive design with Tailwind CSS
- Protected routes and navigation
- Real-time updates and state management

## �📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase account and project set up
- Basic knowledge of React and JavaScript

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/priyanshudubey/filevault.git
cd filevault/client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Enable Firestore Database
4. Enable Storage
5. Copy your Firebase config and update `src/firebase.js`

```javascript
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 🎯 Usage

### Getting Started

1. **Sign Up** - Create a new account with email and password
2. **Login** - Access your dashboard with existing credentials
3. **Upload Files** - Use the dashboard to upload and manage your files
4. **Secure Access** - All routes are protected and require authentication

### User Flow

```
Signup/Login → Dashboard → File Management → Secure Storage
```

## 🏗️ Project Structure

```
client/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── firebase.js
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Built With

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v7
- **Backend**: Firebase
  - Authentication
  - Firestore Database
  - Storage
- **Language**: JavaScript (ES6+)

## 📜 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔒 Security Features

- **Firebase Authentication** - Secure user authentication
- **Protected Routes** - Authenticated access only
- **Input Validation** - Form validation and error handling
- **Secure Storage** - Files stored securely in Firebase Storage
- **Password Confirmation** - Double verification during signup

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables for Firebase config
4. Deploy with one click

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Priyanshu Dubey**

- GitHub: [@priyanshudubey](https://github.com/priyanshudubey)
- LinkedIn: [\[priyanshudubey\]](https://www.linkedin.com/in/priyanshudubey/)
- Website: [Portfolio](https://priyanshudubey.com/)

## 🙏 Acknowledgments

- React team for the amazing framework
- Firebase team for the backend services
- Tailwind CSS for the beautiful styling
- Vite for the lightning-fast build tool

## 📞 Support

If you have any questions or need help with setup, please open an issue in the GitHub repository.

---

⭐ **Star this repository if you found it helpful!**
