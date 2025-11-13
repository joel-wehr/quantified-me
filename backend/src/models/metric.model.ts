import { db } from '../db/client';
import { z } from 'zod';

// Validation schemas
export const createMetricSchema = z.object({
  metricTypeId: z.number().int().positive(),
  value: z.number(),
  recordedAt: z.string().datetime().or(z.date()),
  source: z.string().optional().default('manual'),
  notes: z.string().optional(),
});

export const updateMetricSchema = createMetricSchema.partial();

export const queryMetricsSchema = z.object({
  metricTypeId: z.number().int().positive().optional(),
  startDate: z.string().datetime().or(z.date()).optional(),
  endDate: z.string().datetime().or(z.date()).optional(),
  source: z.string().optional(),
  limit: z.number().int().positive().max(1000).optional().default(100),
  offset: z.number().int().nonnegative().optional().default(0),
});

// Types
export interface HealthMetric {
  id: string;
  userId: string;
  metricTypeId: number;
  value: number;
  recordedAt: Date;
  source: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MetricWithType extends HealthMetric {
  metricName: string;
  displayName: string;
  unit: string;
  categoryName: string;
  categoryColor: string;
}

export class MetricModel {
  /**
   * Create a new health metric
   */
  static async create(
    userId: string,
    data: z.infer<typeof createMetricSchema>
  ): Promise<HealthMetric> {
    const validated = createMetricSchema.parse(data);

    const result = await db.query<HealthMetric>(
      `INSERT INTO health_metrics (user_id, metric_type_id, value, recorded_at, source, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        userId,
        validated.metricTypeId,
        validated.value,
        validated.recordedAt,
        validated.source,
        validated.notes,
      ]
    );

    return result.rows[0];
  }

  /**
   * Get metrics for a user with optional filters
   */
  static async findByUser(
    userId: string,
    filters: z.infer<typeof queryMetricsSchema> = {}
  ): Promise<MetricWithType[]> {
    const validated = queryMetricsSchema.parse(filters);

    let query = `
      SELECT
        hm.*,
        mt.name as metric_name,
        mt.display_name,
        mt.unit,
        mc.name as category_name,
        mc.color as category_color
      FROM health_metrics hm
      JOIN metric_types mt ON hm.metric_type_id = mt.id
      JOIN metric_categories mc ON mt.category_id = mc.id
      WHERE hm.user_id = $1
    `;

    const params: any[] = [userId];
    let paramIndex = 2;

    if (validated.metricTypeId) {
      query += ` AND hm.metric_type_id = $${paramIndex}`;
      params.push(validated.metricTypeId);
      paramIndex++;
    }

    if (validated.startDate) {
      query += ` AND hm.recorded_at >= $${paramIndex}`;
      params.push(validated.startDate);
      paramIndex++;
    }

    if (validated.endDate) {
      query += ` AND hm.recorded_at <= $${paramIndex}`;
      params.push(validated.endDate);
      paramIndex++;
    }

    if (validated.source) {
      query += ` AND hm.source = $${paramIndex}`;
      params.push(validated.source);
      paramIndex++;
    }

    query += ` ORDER BY hm.recorded_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(validated.limit, validated.offset);

    const result = await db.query<MetricWithType>(query, params);
    return result.rows;
  }

  /**
   * Get a single metric by ID
   */
  static async findById(id: string, userId: string): Promise<MetricWithType | null> {
    const result = await db.query<MetricWithType>(
      `SELECT
        hm.*,
        mt.name as metric_name,
        mt.display_name,
        mt.unit,
        mc.name as category_name,
        mc.color as category_color
      FROM health_metrics hm
      JOIN metric_types mt ON hm.metric_type_id = mt.id
      JOIN metric_categories mc ON mt.category_id = mc.id
      WHERE hm.id = $1 AND hm.user_id = $2`,
      [id, userId]
    );

    return result.rows[0] || null;
  }

  /**
   * Update a metric
   */
  static async update(
    id: string,
    userId: string,
    data: z.infer<typeof updateMetricSchema>
  ): Promise<HealthMetric | null> {
    const validated = updateMetricSchema.parse(data);

    const updates: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (validated.metricTypeId !== undefined) {
      updates.push(`metric_type_id = $${paramIndex}`);
      params.push(validated.metricTypeId);
      paramIndex++;
    }

    if (validated.value !== undefined) {
      updates.push(`value = $${paramIndex}`);
      params.push(validated.value);
      paramIndex++;
    }

    if (validated.recordedAt !== undefined) {
      updates.push(`recorded_at = $${paramIndex}`);
      params.push(validated.recordedAt);
      paramIndex++;
    }

    if (validated.source !== undefined) {
      updates.push(`source = $${paramIndex}`);
      params.push(validated.source);
      paramIndex++;
    }

    if (validated.notes !== undefined) {
      updates.push(`notes = $${paramIndex}`);
      params.push(validated.notes);
      paramIndex++;
    }

    if (updates.length === 0) {
      return null;
    }

    params.push(id, userId);

    const result = await db.query<HealthMetric>(
      `UPDATE health_metrics
       SET ${updates.join(', ')}
       WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1}
       RETURNING *`,
      params
    );

    return result.rows[0] || null;
  }

  /**
   * Delete a metric
   */
  static async delete(id: string, userId: string): Promise<boolean> {
    const result = await db.query(
      `DELETE FROM health_metrics WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    return (result.rowCount || 0) > 0;
  }

  /**
   * Get metric statistics for a user
   */
  static async getStats(
    userId: string,
    metricTypeId: number,
    startDate?: Date | string,
    endDate?: Date | string
  ) {
    let query = `
      SELECT
        COUNT(*) as count,
        AVG(value) as average,
        MIN(value) as min,
        MAX(value) as max,
        STDDEV(value) as std_dev
      FROM health_metrics
      WHERE user_id = $1 AND metric_type_id = $2
    `;

    const params: any[] = [userId, metricTypeId];
    let paramIndex = 3;

    if (startDate) {
      query += ` AND recorded_at >= $${paramIndex}`;
      params.push(startDate);
      paramIndex++;
    }

    if (endDate) {
      query += ` AND recorded_at <= $${paramIndex}`;
      params.push(endDate);
      paramIndex++;
    }

    const result = await db.query(query, params);
    return result.rows[0];
  }
}
