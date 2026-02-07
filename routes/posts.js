import express from 'express';
import Post from '../models/Post.js';
import { isAuthenticated, isPostAuthor } from '../middleware/auth.js';
import { parseMarkdown, getExcerpt } from '../utils/markdown.js';
import { buildSearchQuery, buildSortOptions, getPaginationData } from '../utils/search.js';

const router = express.Router();

// GET / - List all posts with search, filter, and pagination
router.get('/', async (req, res, next) => {
    try {
        const { search, category, tag, sort, page } = req.query;

        // Build query
        const query = buildSearchQuery({ search, category, tag });
        const sortOptions = buildSortOptions(sort);

        // Get total count for pagination
        const totalPosts = await Post.countDocuments(query);
        const pagination = getPaginationData(page, totalPosts);

        // Fetch posts
        const posts = await Post.find(query)
            .sort(sortOptions)
            .skip(pagination.skip)
            .limit(pagination.limit)
            .populate('author', 'username')
            .lean();

        // Add excerpts to posts
        posts.forEach(post => {
            post.excerpt = getExcerpt(post.content, 200);
        });

        // Get all categories and tags for filters
        const allCategories = await Post.distinct('categories');
        const allTags = await Post.distinct('tags');

        res.render('index', {
            posts,
            pagination,
            filters: { search, category, tag, sort },
            allCategories,
            allTags,
            currentYear: new Date().getFullYear()
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// GET /posts/new - New post form
router.get('/posts/new', isAuthenticated, (req, res) => {
    res.render('new', {
        currentYear: new Date().getFullYear(),
        error: null
    });
});

// POST /posts - Create new post
router.post('/posts', isAuthenticated, async (req, res, next) => {
    try {
        const { title, content, categories, tags, images } = req.body;

        if (!title || !content) {
            return res.render('new', {
                currentYear: new Date().getFullYear(),
                error: 'Title and content are required'
            });
        }

        // Parse categories and tags
        const categoryArray = categories ? categories.split(',').map(c => c.trim()).filter(c => c) : [];
        const tagArray = tags ? tags.split(',').map(t => t.trim()).filter(t => t) : [];
        const imageArray = images ? (Array.isArray(images) ? images : [images]) : [];

        const post = new Post({
            title,
            content,
            author: req.user._id,
            categories: categoryArray,
            tags: tagArray,
            images: imageArray
        });

        await post.save();
        res.redirect(`/posts/${post.slug}`);
    } catch (error) {
        console.error(error);
        res.render('new', {
            currentYear: new Date().getFullYear(),
            error: 'An error occurred while creating the post'
        });
    }
});

// GET /posts/:slug - View single post
router.get('/posts/:slug', async (req, res, next) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug })
            .populate('author', 'username')
            .lean();

        if (!post) {
            return res.status(404).send('Post not found');
        }

        // Parse markdown content
        post.htmlContent = parseMarkdown(post.content);

        // Get comments for this post
        const Comment = (await import('../models/Comment.js')).default;
        const comments = await Comment.find({ post: post._id, parentComment: null })
            .populate('author', 'username')
            .populate({
                path: 'parentComment',
                populate: { path: 'author', select: 'username' }
            })
            .sort({ createdAt: -1 })
            .lean();

        // Get replies for each comment
        for (let comment of comments) {
            comment.replies = await Comment.find({ parentComment: comment._id })
                .populate('author', 'username')
                .sort({ createdAt: 1 })
                .lean();
        }

        res.render('post', {
            post,
            comments,
            currentYear: new Date().getFullYear()
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// GET /posts/:id/edit - Edit post form
router.get('/posts/:id/edit', isAuthenticated, isPostAuthor, async (req, res, next) => {
    try {
        const post = req.post;

        res.render('edit', {
            post: {
                ...post.toObject(),
                categories: post.categories.join(', '),
                tags: post.tags.join(', ')
            },
            currentYear: new Date().getFullYear(),
            error: null
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// PUT /posts/:id - Update post
router.put('/posts/:id', isAuthenticated, isPostAuthor, async (req, res, next) => {
    try {
        const { title, content, categories, tags, images } = req.body;
        const post = req.post;

        if (!title || !content) {
            return res.render('edit', {
                post: post.toObject(),
                currentYear: new Date().getFullYear(),
                error: 'Title and content are required'
            });
        }

        // Parse categories and tags
        const categoryArray = categories ? categories.split(',').map(c => c.trim()).filter(c => c) : [];
        const tagArray = tags ? tags.split(',').map(t => t.trim()).filter(t => t) : [];
        const imageArray = images ? (Array.isArray(images) ? images : [images]) : [];

        post.title = title;
        post.content = content;
        post.categories = categoryArray;
        post.tags = tagArray;
        post.images = imageArray;

        await post.save();
        res.redirect(`/posts/${post.slug}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// DELETE /posts/:id - Delete post
router.delete('/posts/:id', isAuthenticated, isPostAuthor, async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id);

        // Also delete associated comments
        const Comment = (await import('../models/Comment.js')).default;
        await Comment.deleteMany({ post: req.params.id });

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

export default router;
