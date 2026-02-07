import Post from '../models/Post.js';

// Middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
};

// Middleware to check if user is the post author
export const isPostAuthor = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).send('You are not authorized to perform this action');
        }

        req.post = post;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Middleware to attach user to locals for templates
export const attachUser = (req, res, next) => {
    res.locals.currentUser = req.user || null;
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
};
