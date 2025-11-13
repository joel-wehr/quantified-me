import { Request, Response } from 'express';
import { MetricModel, createMetricSchema, updateMetricSchema, queryMetricsSchema } from '../models/metric.model';
import { MetricTypeModel } from '../models/metric-type.model';
import { z } from 'zod';

export class MetricsController {
  /**
   * GET /api/v1/metrics
   * Get all metrics for the authenticated user
   */
  static async getMetrics(req: Request, res: Response) {
    try {
      const userId = req.user!.username; // From auth middleware
      const filters = {
        metricTypeId: req.query.metricTypeId ? parseInt(req.query.metricTypeId as string) : undefined,
        startDate: req.query.startDate as string | undefined,
        endDate: req.query.endDate as string | undefined,
        source: req.query.source as string | undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
      };

      const metrics = await MetricModel.findByUser(userId, filters);

      res.json({
        success: true,
        data: metrics,
        count: metrics.length,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation Error',
          details: error.errors,
        });
      }

      console.error('Get metrics error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch metrics',
      });
    }
  }

  /**
   * GET /api/v1/metrics/:id
   * Get a specific metric by ID
   */
  static async getMetricById(req: Request, res: Response) {
    try {
      const userId = req.user!.username;
      const metricId = req.params.id;

      const metric = await MetricModel.findById(metricId, userId);

      if (!metric) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Metric not found',
        });
      }

      res.json({
        success: true,
        data: metric,
      });
    } catch (error) {
      console.error('Get metric by ID error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch metric',
      });
    }
  }

  /**
   * POST /api/v1/metrics
   * Create a new health metric
   */
  static async createMetric(req: Request, res: Response) {
    try {
      const userId = req.user!.username;
      const metric = await MetricModel.create(userId, req.body);

      res.status(201).json({
        success: true,
        data: metric,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation Error',
          details: error.errors,
        });
      }

      console.error('Create metric error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to create metric',
      });
    }
  }

  /**
   * PUT /api/v1/metrics/:id
   * Update an existing metric
   */
  static async updateMetric(req: Request, res: Response) {
    try {
      const userId = req.user!.username;
      const metricId = req.params.id;

      const metric = await MetricModel.update(metricId, userId, req.body);

      if (!metric) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Metric not found',
        });
      }

      res.json({
        success: true,
        data: metric,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation Error',
          details: error.errors,
        });
      }

      console.error('Update metric error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to update metric',
      });
    }
  }

  /**
   * DELETE /api/v1/metrics/:id
   * Delete a metric
   */
  static async deleteMetric(req: Request, res: Response) {
    try {
      const userId = req.user!.username;
      const metricId = req.params.id;

      const deleted = await MetricModel.delete(metricId, userId);

      if (!deleted) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Metric not found',
        });
      }

      res.json({
        success: true,
        message: 'Metric deleted successfully',
      });
    } catch (error) {
      console.error('Delete metric error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to delete metric',
      });
    }
  }

  /**
   * GET /api/v1/metrics/stats/:metricTypeId
   * Get statistics for a metric type
   */
  static async getMetricStats(req: Request, res: Response) {
    try {
      const userId = req.user!.username;
      const metricTypeId = parseInt(req.params.metricTypeId);
      const startDate = req.query.startDate as string | undefined;
      const endDate = req.query.endDate as string | undefined;

      const stats = await MetricModel.getStats(userId, metricTypeId, startDate, endDate);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error('Get metric stats error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch statistics',
      });
    }
  }

  /**
   * GET /api/v1/metrics/types
   * Get all metric types
   */
  static async getMetricTypes(req: Request, res: Response) {
    try {
      const category = req.query.category as string | undefined;

      const metricTypes = category
        ? await MetricTypeModel.findByCategory(category)
        : await MetricTypeModel.findAll();

      res.json({
        success: true,
        data: metricTypes,
      });
    } catch (error) {
      console.error('Get metric types error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch metric types',
      });
    }
  }

  /**
   * GET /api/v1/metrics/categories
   * Get all metric categories
   */
  static async getMetricCategories(req: Request, res: Response) {
    try {
      const categories = await MetricTypeModel.findAllCategories();

      res.json({
        success: true,
        data: categories,
      });
    } catch (error) {
      console.error('Get metric categories error:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to fetch categories',
      });
    }
  }
}
