import { Router } from 'express';
import * as favoriteController from '../controllers/favoriteController';

const router = Router();

router.get('/', favoriteController.getFavorites);
router.post('/', favoriteController.addFavorite);
router.delete('/:productId', favoriteController.removeFavorite);

export default router;
