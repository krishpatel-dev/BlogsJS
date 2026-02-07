# 🌐 Full-Featured Blog Platform

A beautiful, modern blog application built with **Node.js**, **Express.js**, **MongoDB**, and **EJS**. Features a sleek dark theme with vibrant gradients, smooth animations, full responsive design, and comprehensive blogging capabilities.

![Blog Application](https://img.shields.io/badge/Node.js-Express-green)
![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![License](https://img.shields.io/badge/license-ISC-blue)

## 🌟 Features

### Core Functionality
- ✅ **User Authentication** - Secure registration and login with Passport.js
- ✅ **Create Posts** - Write and publish blog posts with markdown support
- ✅ **View Posts** - Browse all posts with search, filters, and pagination
- ✅ **Edit Posts** - Update your posts anytime with markdown editor
- ✅ **Delete Posts** - Remove posts with confirmation dialog
- ✅ **Persistent Storage** - MongoDB database for all data

### Advanced Features
- ✅ **Markdown Support** - Full markdown editor with toolbar and live rendering
- ✅ **Image Uploads** - Multiple image upload with preview and management
- ✅ **Categories & Tags** - Organize posts with categories and tags
- ✅ **Search & Filter** - Full-text search with category/tag filtering
- ✅ **Pagination** - Navigate through posts (9 per page)
- ✅ **Comment System** - Nested comments with replies
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Modern UI** - Dark theme with gradient accents and smooth animations

## 🎨 Design Highlights

- **Dark Theme** with vibrant purple gradients
- **Smooth Animations** - Fade-in, slide-in, and hover effects
- **Modern Typography** - Playfair Display for headings, Inter for body text
- **Responsive Grid** - Adapts from 3 columns to 1 column on mobile
- **Glassmorphism Effects** - Backdrop blur and translucent elements
- **Markdown Rendering** - Beautiful code blocks, tables, and formatting

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas account)
- npm (comes with Node.js)

### Installation

1. **Clone or download this repository**

2. **Navigate to the project directory**
   ```bash
   cd "Blog Website"
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your MongoDB connection string
   - Change `SESSION_SECRET` to a secure random string

5. **Start MongoDB** (if using local MongoDB)
   ```bash
   mongod
   ```

6. **Start the server**
   ```bash
   npm start
   ```

7. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
Blog Website/
├── config/
│   ├── database.js          # MongoDB connection
│   ├── passport.js          # Authentication strategy
│   └── multer.js            # File upload configuration
├── models/
│   ├── User.js              # User schema
│   ├── Post.js              # Post schema
│   └── Comment.js           # Comment schema
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── posts.js             # Post CRUD routes
│   ├── comments.js          # Comment routes
│   └── upload.js            # Image upload routes
├── middleware/
│   └── auth.js              # Authentication middleware
├── utils/
│   ├── markdown.js          # Markdown parsing
│   └── search.js            # Search & pagination helpers
├── views/                   # EJS templates
│   ├── index.ejs            # Home page
│   ├── post.ejs             # Single post view
│   ├── new.ejs              # Create post form
│   ├── edit.ejs             # Edit post form
│   ├── login.ejs            # Login page
│   ├── register.ejs         # Registration page
│   └── 404.ejs              # Error page
├── public/                  # Static files
│   ├── css/style.css        # Main stylesheet
│   └── uploads/             # User uploaded images
├── .env                     # Environment variables (create from .env.example)
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
├── server.js                # Main application file
├── package.json             # Dependencies
├── README.md                # This file
├── SECURITY.md              # Security best practices
├── MONGODB_SETUP_GUIDE.md   # MongoDB setup instructions
├── QUICK_START.md           # Quick start guide
└── TROUBLESHOOTING.md       # Common issues and fixes
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Passport.js** - Authentication middleware
- **bcrypt** - Password hashing

### Features
- **Multer** - File upload handling
- **Marked** - Markdown parsing
- **DOMPurify** - XSS protection
- **Slugify** - URL-friendly slugs
- **express-session** - Session management
- **connect-mongo** - MongoDB session store

### Frontend
- **EJS** - Templating engine
- **Vanilla CSS** - Modern CSS with variables
- **Google Fonts** - Playfair Display & Inter

## 📝 Usage Guide

### Creating an Account
1. Click "Register" in the navigation
2. Fill in username, email, and password
3. You'll be automatically logged in

### Creating a Post
1. Click "New Post" (must be logged in)
2. Enter title, categories (comma-separated), and tags
3. Upload images (optional, multiple supported)
4. Write content using markdown
5. Use the toolbar for quick formatting
6. Click "Publish Post"

### Markdown Formatting
```markdown
## Heading 2
**Bold text**
*Italic text*
[Link text](https://example.com)
`inline code`

- List item 1
- List item 2

```javascript
// Code block
const example = "Hello World";
```
```

### Searching and Filtering
- Use the search bar to find posts by keyword
- Filter by category using the dropdown
- Filter by tag using the dropdown
- Sort posts by newest, oldest, updated, or alphabetical
- Combine multiple filters for precise results

### Commenting
1. View any post
2. Scroll to the comments section
3. Write your comment
4. Click "Post Comment"
5. Reply to comments by clicking "Reply"

## 🎯 API Routes

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| GET | `/` | Home page with posts | No |
| GET | `/register` | Registration form | No |
| POST | `/register` | Create new user | No |
| GET | `/login` | Login form | No |
| POST | `/login` | Authenticate user | No |
| GET | `/logout` | End session | Yes |
| GET | `/posts/new` | New post form | Yes |
| POST | `/posts` | Create post | Yes |
| GET | `/posts/:slug` | View single post | No |
| GET | `/posts/:id/edit` | Edit post form | Yes (Author) |
| PUT | `/posts/:id` | Update post | Yes (Author) |
| DELETE | `/posts/:id` | Delete post | Yes (Author) |
| POST | `/posts/:postId/comments` | Create comment | Yes |
| POST | `/comments/:id/reply` | Reply to comment | Yes |
| DELETE | `/comments/:id` | Delete comment | Yes (Author) |
| POST | `/upload/image` | Upload single image | Yes |
| POST | `/upload/images` | Upload multiple images | Yes |
| DELETE | `/upload/image/:filename` | Delete image | Yes |

## 💾 Database Schema

### User Collection
- `username` - Unique username (3-30 characters)
- `email` - Unique email address
- `password` - Hashed password (bcrypt)
- `createdAt` - Account creation date

### Post Collection
- `title` - Post title (max 200 characters)
- `slug` - URL-friendly identifier (auto-generated)
- `content` - Markdown content
- `author` - Reference to User
- `categories` - Array of category strings
- `tags` - Array of tag strings
- `images` - Array of image URLs
- `createdAt` - Post creation date
- `updatedAt` - Last update date

### Comment Collection
- `content` - Comment text (max 1000 characters)
- `author` - Reference to User
- `post` - Reference to Post
- `parentComment` - Reference to parent Comment (for replies)
- `createdAt` - Comment creation date
- `updatedAt` - Last update date

## 🎨 Customization

### Change Colors
Edit the CSS variables in `public/css/style.css`:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --dark-bg: #0f0f23;
  --card-bg: #1a1a2e;
  /* ... more variables */
}
```

### Modify Pagination
Change posts per page in `utils/search.js`:
```javascript
export const getPaginationData = (page, totalPosts, postsPerPage = 9) => {
  // Change 9 to your desired number
}
```

### Update File Upload Limits
Edit `.env` file:
```
MAX_FILE_SIZE=5242880  # 5MB in bytes
```

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (3-column grid)
- **Tablet**: 481px - 768px (2-column grid)
- **Mobile**: ≤ 480px (1-column grid)

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ XSS protection for markdown content (DOMPurify)
- ✅ Session security with MongoDB store
- ✅ File upload validation (type and size limits)
- ✅ Authorization checks on protected routes
- ✅ Input validation on all forms

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env` file
- For MongoDB Atlas, ensure IP whitelist is configured

### Port Already in Use
- Change `PORT` in `.env` file
- Or stop the process using port 3000

### Image Upload Fails
- Check `public/uploads/` directory exists
- Verify file size is under 5MB
- Ensure file type is jpg, png, gif, or webp

---

<div align="center">
  Made with ❤️ and ☕ by <b>Krish</b>
</div>   