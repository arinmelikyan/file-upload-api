const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authenticateJWT = require('../middlewares/authenticateJWT');

// GET all pdf files (protected route)
router.get('/file', authenticateJWT, fileController.getAll);

// POST create pdf file (protected route)
router.post('/file/upload', authenticateJWT, fileController.create);

// GET pdf file by ID (unprotected route)
router.get('/file/:id', fileController.getOne);

// PUT update pdf file by ID (protected route)
router.put('/file/:id', authenticateJWT, fileController.updateOne);

// DELETE  pdf file by ID (protected route)
router.delete('/file/:id', authenticateJWT, fileController.deleteOne);

module.exports = router;