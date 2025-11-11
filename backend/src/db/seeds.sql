-- Seed data for Quantified Me
-- Initial metric categories and types

-- Insert metric categories
INSERT INTO metric_categories (name, description, icon, color) VALUES
('activity', 'Physical activity and exercise metrics', 'activity', '#0d6efd'),
('sleep', 'Sleep quality and duration metrics', 'moon', '#6f42c1'),
('recovery', 'Recovery and wellness metrics', 'heart', '#dc3545'),
('nutrition', 'Nutrition and dietary metrics', 'coffee', '#fd7e14'),
('mental', 'Mental health and mood metrics', 'brain', '#20c997'),
('vitals', 'Vital signs and health measurements', 'thermometer', '#d63384')
ON CONFLICT (name) DO NOTHING;

-- Insert activity metric types
INSERT INTO metric_types (category_id, name, display_name, description, unit, data_type, min_value, max_value) VALUES
((SELECT id FROM metric_categories WHERE name = 'activity'), 'steps', 'Steps', 'Daily step count', 'steps', 'integer', 0, 100000),
((SELECT id FROM metric_categories WHERE name = 'activity'), 'distance', 'Distance', 'Distance covered', 'km', 'decimal', 0, 100),
((SELECT id FROM metric_categories WHERE name = 'activity'), 'active_minutes', 'Active Minutes', 'Minutes of active movement', 'min', 'integer', 0, 1440),
((SELECT id FROM metric_categories WHERE name = 'activity'), 'calories_burned', 'Calories Burned', 'Active calories burned', 'kcal', 'integer', 0, 10000),
((SELECT id FROM metric_categories WHERE name = 'activity'), 'exercise_minutes', 'Exercise Minutes', 'Structured exercise time', 'min', 'integer', 0, 480),
((SELECT id FROM metric_categories WHERE name = 'activity'), 'floors_climbed', 'Floors Climbed', 'Number of floors climbed', 'floors', 'integer', 0, 200)
ON CONFLICT (name) DO NOTHING;

-- Insert sleep metric types
INSERT INTO metric_types (category_id, name, display_name, description, unit, data_type, min_value, max_value) VALUES
((SELECT id FROM metric_categories WHERE name = 'sleep'), 'sleep_duration', 'Sleep Duration', 'Total sleep time', 'hours', 'decimal', 0, 24),
((SELECT id FROM metric_categories WHERE name = 'sleep'), 'deep_sleep', 'Deep Sleep', 'Deep sleep duration', 'hours', 'decimal', 0, 12),
((SELECT id FROM metric_categories WHERE name = 'sleep'), 'rem_sleep', 'REM Sleep', 'REM sleep duration', 'hours', 'decimal', 0, 12),
((SELECT id FROM metric_categories WHERE name = 'sleep'), 'light_sleep', 'Light Sleep', 'Light sleep duration', 'hours', 'decimal', 0, 12),
((SELECT id FROM metric_categories WHERE name = 'sleep'), 'sleep_score', 'Sleep Score', 'Overall sleep quality score', 'score', 'integer', 0, 100),
((SELECT id FROM metric_categories WHERE name = 'sleep'), 'time_to_sleep', 'Time to Fall Asleep', 'Minutes to fall asleep', 'min', 'integer', 0, 120),
((SELECT id FROM metric_categories WHERE name = 'sleep'), 'times_woken', 'Times Woken', 'Number of times woken during sleep', 'times', 'integer', 0, 50)
ON CONFLICT (name) DO NOTHING;

-- Insert recovery metric types
INSERT INTO metric_types (category_id, name, display_name, description, unit, data_type, min_value, max_value) VALUES
((SELECT id FROM metric_categories WHERE name = 'recovery'), 'resting_heart_rate', 'Resting Heart Rate', 'Heart rate at rest', 'bpm', 'integer', 30, 150),
((SELECT id FROM metric_categories WHERE name = 'recovery'), 'hrv', 'Heart Rate Variability', 'HRV measurement', 'ms', 'integer', 0, 200),
((SELECT id FROM metric_categories WHERE name = 'recovery'), 'recovery_score', 'Recovery Score', 'Overall recovery rating', 'score', 'integer', 0, 100),
((SELECT id FROM metric_categories WHERE name = 'recovery'), 'stress_level', 'Stress Level', 'Perceived stress level', 'score', 'integer', 0, 10),
((SELECT id FROM metric_categories WHERE name = 'recovery'), 'readiness_score', 'Readiness Score', 'Overall readiness for activity', 'score', 'integer', 0, 100)
ON CONFLICT (name) DO NOTHING;

-- Insert nutrition metric types
INSERT INTO metric_types (category_id, name, display_name, description, unit, data_type, min_value, max_value) VALUES
((SELECT id FROM metric_categories WHERE name = 'nutrition'), 'calories_consumed', 'Calories Consumed', 'Total calories eaten', 'kcal', 'integer', 0, 10000),
((SELECT id FROM metric_categories WHERE name = 'nutrition'), 'protein', 'Protein', 'Protein intake', 'g', 'integer', 0, 500),
((SELECT id FROM metric_categories WHERE name = 'nutrition'), 'carbs', 'Carbohydrates', 'Carbohydrate intake', 'g', 'integer', 0, 1000),
((SELECT id FROM metric_categories WHERE name = 'nutrition'), 'fat', 'Fat', 'Fat intake', 'g', 'integer', 0, 300),
((SELECT id FROM metric_categories WHERE name = 'nutrition'), 'fiber', 'Fiber', 'Dietary fiber intake', 'g', 'integer', 0, 100),
((SELECT id FROM metric_categories WHERE name = 'nutrition'), 'water', 'Water Intake', 'Water consumption', 'L', 'decimal', 0, 10),
((SELECT id FROM metric_categories WHERE name = 'nutrition'), 'caffeine', 'Caffeine', 'Caffeine intake', 'mg', 'integer', 0, 1000)
ON CONFLICT (name) DO NOTHING;

-- Insert mental health metric types
INSERT INTO metric_types (category_id, name, display_name, description, unit, data_type, min_value, max_value) VALUES
((SELECT id FROM metric_categories WHERE name = 'mental'), 'mood_score', 'Mood Score', 'Overall mood rating', 'score', 'integer', 0, 10),
((SELECT id FROM metric_categories WHERE name = 'mental'), 'energy_level', 'Energy Level', 'Perceived energy level', 'score', 'integer', 0, 10),
((SELECT id FROM metric_categories WHERE name = 'mental'), 'meditation_minutes', 'Meditation', 'Meditation or mindfulness time', 'min', 'integer', 0, 480),
((SELECT id FROM metric_categories WHERE name = 'mental'), 'anxiety_level', 'Anxiety Level', 'Perceived anxiety level', 'score', 'integer', 0, 10),
((SELECT id FROM metric_categories WHERE name = 'mental'), 'focus_score', 'Focus Score', 'Ability to concentrate', 'score', 'integer', 0, 10)
ON CONFLICT (name) DO NOTHING;

-- Insert vitals metric types
INSERT INTO metric_types (category_id, name, display_name, description, unit, data_type, min_value, max_value) VALUES
((SELECT id FROM metric_categories WHERE name = 'vitals'), 'weight', 'Weight', 'Body weight', 'kg', 'decimal', 20, 300),
((SELECT id FROM metric_categories WHERE name = 'vitals'), 'body_fat', 'Body Fat %', 'Body fat percentage', '%', 'decimal', 0, 60),
((SELECT id FROM metric_categories WHERE name = 'vitals'), 'blood_pressure_sys', 'Blood Pressure (Systolic)', 'Systolic blood pressure', 'mmHg', 'integer', 70, 200),
((SELECT id FROM metric_categories WHERE name = 'vitals'), 'blood_pressure_dia', 'Blood Pressure (Diastolic)', 'Diastolic blood pressure', 'mmHg', 'integer', 40, 130),
((SELECT id FROM metric_categories WHERE name = 'vitals'), 'body_temp', 'Body Temperature', 'Core body temperature', '°C', 'decimal', 35, 42),
((SELECT id FROM metric_categories WHERE name = 'vitals'), 'spo2', 'Blood Oxygen', 'Blood oxygen saturation', '%', 'integer', 80, 100),
((SELECT id FROM metric_categories WHERE name = 'vitals'), 'glucose', 'Blood Glucose', 'Blood glucose level', 'mg/dL', 'integer', 40, 400)
ON CONFLICT (name) DO NOTHING;
