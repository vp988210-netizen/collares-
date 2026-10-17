import { Router } from 'express';
import * as customizationController from '../controllers/customizationController';

const router = Router();

router.post('/', customizationController.createCustomization);
router.get('/:id', customizationController.getCustomizationById);
router.put('/:id', customizationController.updateCustomization);
router.delete('/:id', customizationController.deleteCustomization);

export default router;
