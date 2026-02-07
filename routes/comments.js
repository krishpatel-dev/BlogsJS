import express from 'express';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// POST /posts/:postId/comments - Create comment
router.post('/posts/:postId/comments', isAuthenticated, async (req, res, next) => {
    try {
        const { content } = req.body;
        const postId = req.params.postId;

        if (!content || content.trim() === '') {
            return res.status(400).send('Comment content is required');
        }

        // Verify post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        const comment = new Comment({
            content: content.trim(),
            author: req.user._id,
            post: postId
        });

        await comment.save();
        res.redirect(`/posts/${post.slug}#comments`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// POST /comments/:id/reply - Reply to comment
router.post('/comments/:id/reply', isAuthenticated, async (req, res, next) => {
    try {
        const { content } = req.body;
        const parentCommentId = req.params.id;

        if (!content || content.trim() === '') {
            return res.status(400).send('Reply content is required');
        }

        // Get parent comment to find the post
        const parentComment = await Comment.findById(parentCommentId);
        if (!parentComment) {
            return res.status(404).send('Comment not found');
        }

        const post = await Post.findById(parentComment.post);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        const reply = new Comment({
            content: content.trim(),
            author: req.user._id,
            post: parentComment.post,
            parentComment: parentCommentId
        });

        await reply.save();
        res.redirect(`/posts/${post.slug}#comments`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// DELETE /comments/:id - Delete comment
router.delete('/comments/:id', isAuthenticated, async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).send('Comment not found');
        }

        // Check if user is comment author
        if (comment.author.toString() !== req.user._id.toString()) {
            return res.status(403).send('You are not authorized to delete this comment');
        }

        const post = await Post.findById(comment.post);

        // Delete comment and all replies
        await Comment.deleteMany({
            $or: [
                { _id: req.params.id },
                { parentComment: req.params.id }
            ]
        });

        res.redirect(`/posts/${post.slug}#comments`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

export default router;
