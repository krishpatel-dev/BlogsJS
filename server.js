import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import connectDB from './config/database.js';
import passport from './config/passport.js';
import { attachUser } from './middleware/auth.js';

// Import routes
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import uploadRoutes from './routes/upload.js';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 24 * 3600 // lazy session update
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Attach user to locals for all templates
app.use(attachUser);

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Routes
app.use('/', authRoutes);
app.use('/', postRoutes);
app.use('/', commentRoutes);
app.use('/', uploadRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    currentYear: new Date().getFullYear()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Blog server running on http://localhost:${port}`);
});
