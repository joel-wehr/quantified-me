interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
  metricType?: 'activity' | 'sleep' | 'recovery' | 'nutrition' | 'mental';
}

export default function MetricCard({
  title,
  value,
  unit,
  change,
  changeType = 'neutral',
  icon = 'activity',
  metricType = 'activity'
}: MetricCardProps) {
  const changeColorClass = changeType === 'positive'
    ? 'text-success'
    : changeType === 'negative'
      ? 'text-danger'
      : 'text-body-tertiary';

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className={`card metric-card metric-${metricType} h-100`}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <p className="text-body-secondary fw-semibold mb-1 fs-9">{title}</p>
              <h2 className="fw-bold mb-0">
                {value}
                {unit && <span className="fs-7 fw-normal text-body-tertiary ms-1">{unit}</span>}
              </h2>
            </div>
            <div className="flex-shrink-0">
              <span
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'var(--phoenix-gray-100)'
                }}
              >
                <span data-feather={icon} style={{ height: '24px', width: '24px' }}></span>
              </span>
            </div>
          </div>
          {change && (
            <div className="d-flex align-items-center mt-2">
              <span className={`badge badge-phoenix fs-10 ${changeColorClass}`}>
                <span className="me-1" data-feather={changeType === 'positive' ? 'trending-up' : 'trending-down'}></span>
                {change}
              </span>
              <span className="fs-10 text-body-tertiary ms-2">vs. last week</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
