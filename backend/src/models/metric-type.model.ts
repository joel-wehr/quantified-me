import { db } from '../db/client';

export interface MetricType {
  id: number;
  categoryId: number;
  name: string;
  displayName: string;
  description?: string;
  unit: string;
  dataType: 'integer' | 'decimal' | 'duration' | 'boolean';
  minValue?: number;
  maxValue?: number;
  defaultValue?: number;
  createdAt: Date;
}

export interface MetricCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  createdAt: Date;
}

export interface MetricTypeWithCategory extends MetricType {
  categoryName: string;
  categoryIcon?: string;
  categoryColor?: string;
}

export class MetricTypeModel {
  /**
   * Get all metric types with their categories
   */
  static async findAll(): Promise<MetricTypeWithCategory[]> {
    const result = await db.query<MetricTypeWithCategory>(`
      SELECT
        mt.*,
        mc.name as category_name,
        mc.icon as category_icon,
        mc.color as category_color
      FROM metric_types mt
      JOIN metric_categories mc ON mt.category_id = mc.id
      ORDER BY mc.name, mt.display_name
    `);

    return result.rows;
  }

  /**
   * Get metric types by category
   */
  static async findByCategory(categoryName: string): Promise<MetricTypeWithCategory[]> {
    const result = await db.query<MetricTypeWithCategory>(
      `SELECT
        mt.*,
        mc.name as category_name,
        mc.icon as category_icon,
        mc.color as category_color
      FROM metric_types mt
      JOIN metric_categories mc ON mt.category_id = mc.id
      WHERE mc.name = $1
      ORDER BY mt.display_name`,
      [categoryName]
    );

    return result.rows;
  }

  /**
   * Get a metric type by ID
   */
  static async findById(id: number): Promise<MetricTypeWithCategory | null> {
    const result = await db.query<MetricTypeWithCategory>(
      `SELECT
        mt.*,
        mc.name as category_name,
        mc.icon as category_icon,
        mc.color as category_color
      FROM metric_types mt
      JOIN metric_categories mc ON mt.category_id = mc.id
      WHERE mt.id = $1`,
      [id]
    );

    return result.rows[0] || null;
  }

  /**
   * Get a metric type by name
   */
  static async findByName(name: string): Promise<MetricTypeWithCategory | null> {
    const result = await db.query<MetricTypeWithCategory>(
      `SELECT
        mt.*,
        mc.name as category_name,
        mc.icon as category_icon,
        mc.color as category_color
      FROM metric_types mt
      JOIN metric_categories mc ON mt.category_id = mc.id
      WHERE mt.name = $1`,
      [name]
    );

    return result.rows[0] || null;
  }

  /**
   * Get all categories
   */
  static async findAllCategories(): Promise<MetricCategory[]> {
    const result = await db.query<MetricCategory>(`
      SELECT * FROM metric_categories
      ORDER BY name
    `);

    return result.rows;
  }
}
