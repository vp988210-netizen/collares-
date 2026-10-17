import { Router } from 'express';
import productRoutes from './productRoutes';
import categoryRoutes from './categoryRoutes';
import customizationRoutes from './customizationRoutes';
import cartRoutes from './cartRoutes';
import orderRoutes from './orderRoutes';
import customerRoutes from './customerRoutes';
import favoriteRoutes from './favoriteRoutes';
import docsRoutes from './docsRoutes';

const apiRouter = Router();

apiRouter.use('/products', productRoutes);
apiRouter.use('/categories', categoryRoutes);
apiRouter.use('/customizations', customizationRoutes);
apiRouter.use('/cart', cartRoutes);
apiRouter.use('/orders', orderRoutes);
apiRouter.use('/customers', customerRoutes);
apiRouter.use('/favorites', favoriteRoutes);
apiRouter.use('/', docsRoutes);

export default apiRouter;
