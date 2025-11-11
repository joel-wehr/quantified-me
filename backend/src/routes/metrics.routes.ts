import { Router } from 'express';
import { MetricsController } from '../controllers/metrics.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Metric Categories
router.get('/categories', MetricsController.getMetricCategories);

// Metric Types
router.get('/types', MetricsController.getMetricTypes);

// Health Metrics
router.get('/', MetricsController.getMetrics);
router.post('/', MetricsController.createMetric);
router.get('/stats/:metricTypeId', MetricsController.getMetricStats);
router.get('/:id', MetricsController.getMetricById);
router.put('/:id', MetricsController.updateMetric);
router.delete('/:id', MetricsController.deleteMetric);

export default router;
