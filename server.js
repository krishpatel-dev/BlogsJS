import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

const app = express();
const port = 3000;

// In-memory storage for blog posts
let posts = [];
let nextId = 1;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Routes

// Home page - View all posts
app.get('/', (req, res) => {
  res.render('index', { posts: posts, currentYear: new Date().getFullYear() });
});

// New post form
app.get('/posts/new', (req, res) => {
  res.render('new', { currentYear: new Date().getFullYear() });
});

// Create new post
app.post('/posts', (req, res) => {
  const newPost = {
    id: nextId++,
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
  posts.unshift(newPost);
  res.redirect('/');
});

// Edit post form
app.get('/posts/:id/edit', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.render('edit', { post: post, currentYear: new Date().getFullYear() });
  } else {
    res.redirect('/');
  }
});

// Update post
app.put('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    post.title = req.body.title;
    post.author = req.body.author;
    post.content = req.body.content;
  }
  res.redirect('/');
});

// Delete post
app.delete('/posts/:id', (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/');
});

// View single post
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.render('post', { post: post, currentYear: new Date().getFullYear() });
  } else {
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Blog server running on http://localhost:${port}`);
});
