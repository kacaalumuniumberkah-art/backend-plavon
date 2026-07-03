import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createKategori, modifyKategori, removeKategori, seeAllKategori } from '../controller/kategoriController.js';

const router = express.Router();

router.post('/create', authMiddleware, createKategori);
router.get('/', seeAllKategori);
router.put('/update/:id', authMiddleware, modifyKategori);
router.delete('/:id', authMiddleware, removeKategori);

export default router;
