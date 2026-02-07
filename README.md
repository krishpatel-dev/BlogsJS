# 🌐 Blog Website

A beautiful, modern blog web application built with **Node.js**, **Express.js**, and **EJS** templating engine. Features a sleek dark theme with vibrant gradients, smooth animations, and full responsive design.

![Blog Application](https://img.shields.io/badge/Node.js-Express-green)
![License](https://img.shields.io/badge/license-ISC-blue)

## 🌟 Features

- ✅ **Create Posts** - Write and publish blog posts with title, author, and content
- ✅ **View Posts** - Browse all posts in a beautiful grid layout
- ✅ **Edit Posts** - Update existing posts anytime
- ✅ **Delete Posts** - Remove posts with confirmation dialog
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Modern UI** - Dark theme with gradient accents and smooth animations
- ✅ **No Database Required** - Uses in-memory storage (posts reset on server restart)

## 🎨 Design Highlights

- **Dark Theme** with vibrant purple gradients
- **Smooth Animations** - Fade-in, slide-in, and hover effects
- **Modern Typography** - Playfair Display for headings, Inter for body text
- **Responsive Grid** - Adapts from 3 columns to 1 column on mobile
- **Glassmorphism Effects** - Backdrop blur and translucent elements

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
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

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
Blog Website/
├── server.js              # Express server and routes
├── package.json           # Project dependencies
├── views/                 # EJS templates
│   ├── index.ejs         # Home page
│   ├── new.ejs           # Create post form
│   ├── edit.ejs          # Edit post form
│   └── post.ejs          # Single post view
└── public/               # Static files
    └── css/
        └── style.css     # All styling
```

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: Vanilla CSS with modern features
- **Middleware**: body-parser, method-override

## 📝 Usage

### Creating a Post
1. Click "New Post" in the navigation
2. Fill in the title, author, and content
3. Click "Publish Post"

### Viewing Posts
- All posts are displayed on the home page
- Click "Read More" to view the full post

### Editing a Post
- Click the edit icon (pencil) on any post card
- Modify the content
- Click "Update Post"

### Deleting a Post
- Click the delete icon (trash) on any post card
- Confirm the deletion

## 🎯 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Home page - list all posts |
| GET | `/posts/new` | New post form |
| POST | `/posts` | Create new post |
| GET | `/posts/:id` | View single post |
| GET | `/posts/:id/edit` | Edit post form |
| PUT | `/posts/:id` | Update post |
| DELETE | `/posts/:id` | Delete post |

## 💾 Data Storage

This application uses **in-memory storage** (JavaScript array). Posts are stored in the server's memory and will be **lost when the server restarts**. This is intentional for learning purposes.

To add persistence, you could integrate:
- MongoDB with Mongoose
- PostgreSQL with Sequelize
- SQLite
- JSON file storage

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

### Modify Layout
- Adjust grid columns in `.posts-grid`
- Change max-width in `.header-content`
- Update spacing variables

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (3-column grid)
- **Tablet**: 481px - 768px (2-column grid)
- **Mobile**: ≤ 480px (1-column grid)

## 🐛 Known Limitations

- Posts are not persistent (reset on server restart)
- No user authentication
- No image upload support
- No markdown or rich text editing
- No search or filtering

## 🚀 Future Enhancements

- [ ] Add database integration (MongoDB/PostgreSQL)
- [ ] Implement user authentication
- [ ] Add markdown support for posts
- [ ] Include image upload functionality
- [ ] Add search and filter features
- [ ] Implement pagination
- [ ] Add categories and tags
- [ ] Include comment system

**Enjoy blogging!** 🎉
