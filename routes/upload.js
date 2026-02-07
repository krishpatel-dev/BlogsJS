import express from 'express';
import upload from '../config/multer.js';
import { isAuthenticated } from '../middleware/auth.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// POST /upload/image - Upload single image
router.post('/upload/image', isAuthenticated, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({
            success: true,
            imageUrl,
            filename: req.file.filename
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// POST /upload/images - Upload multiple images
router.post('/upload/images', isAuthenticated, upload.array('images', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
        res.json({
            success: true,
            imageUrls,
            filenames: req.files.map(f => f.filename)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Upload failed' });
    }
});

// DELETE /upload/image/:filename - Delete image
router.delete('/upload/image/:filename', isAuthenticated, (req, res) => {
    try {
        const filename = req.params.filename;
        const filepath = path.join(__dirname, '..', 'public', 'uploads', filename);

        // Check if file exists
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
            res.json({ success: true, message: 'Image deleted' });
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Delete failed' });
    }
});

export default router;
