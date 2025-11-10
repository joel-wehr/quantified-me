import { useEffect } from 'react';
import MetricCard from '../components/dashboard/MetricCard';

export default function Dashboard() {
  useEffect(() => {
    // Initialize feather icons
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  return (
    <div className="pb-9">
      {/* Page Header */}
      <div className="row mb-4 g-3">
        <div className="col-12 col-xxl-6">
          <h2 className="mb-2">Health Dashboard</h2>
          <h5 className="text-body-tertiary fw-normal">
            Your personal health metrics at a glance
          </h5>
        </div>
        <div className="col-12 col-xxl-6">
          <div className="row g-3">
            <div className="col-auto">
              <button className="btn btn-phoenix-primary">
                <span className="me-2" data-feather="plus"></span>
                Add Metric
              </button>
            </div>
            <div className="col-auto">
              <button className="btn btn-phoenix-secondary">
                <span className="me-2" data-feather="download"></span>
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="row g-3 mb-3">
        <MetricCard
          title="Steps Today"
          value="8,547"
          unit="steps"
          change="+12%"
          changeType="positive"
          icon="activity"
          metricType="activity"
        />
        <MetricCard
          title="Sleep Last Night"
          value="7.5"
          unit="hrs"
          change="+5%"
          changeType="positive"
          icon="moon"
          metricType="sleep"
        />
        <MetricCard
          title="Heart Rate Variability"
          value="68"
          unit="ms"
          change="+8%"
          changeType="positive"
          icon="heart"
          metricType="recovery"
        />
        <MetricCard
          title="Calories Consumed"
          value="1,847"
          unit="kcal"
          change="-3%"
          changeType="neutral"
          icon="coffee"
          metricType="nutrition"
        />
      </div>

      {/* Charts Section */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-xl-8">
          <div className="card h-100">
            <div className="card-header border-bottom border-translucent">
              <div className="row align-items-center">
                <div className="col-sm-auto">
                  <h5 className="mb-2 mb-sm-0">Activity Trends</h5>
                </div>
                <div className="col-sm-auto ms-auto">
                  <div className="nav nav-underline" id="nav-tab" role="tablist">
                    <button
                      className="nav-link active"
                      id="weekly-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#weekly"
                      type="button"
                      role="tab"
                      aria-controls="weekly"
                      aria-selected="true"
                    >
                      Weekly
                    </button>
                    <button
                      className="nav-link"
                      id="monthly-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#monthly"
                      type="button"
                      role="tab"
                      aria-controls="monthly"
                      aria-selected="false"
                    >
                      Monthly
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="weekly" role="tabpanel">
                  <div className="chart-container">
                    <p className="text-body-tertiary text-center py-5">
                      Chart will be rendered here using Chart.js
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="card h-100">
            <div className="card-header border-bottom border-translucent">
              <h5 className="mb-0">AI Insights</h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-start mb-3">
                <span
                  className="badge badge-phoenix badge-phoenix-warning me-2"
                  style={{ marginTop: '2px' }}
                >
                  <span data-feather="zap" style={{ height: '12px', width: '12px' }}></span>
                </span>
                <div>
                  <p className="mb-1 fw-semibold">Sleep Pattern Detected</p>
                  <p className="mb-0 fs-10 text-body-tertiary">
                    You've been consistently sleeping 7+ hours for the past week. Great job!
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-start mb-3">
                <span
                  className="badge badge-phoenix badge-phoenix-info me-2"
                  style={{ marginTop: '2px' }}
                >
                  <span data-feather="trending-up" style={{ height: '12px', width: '12px' }}></span>
                </span>
                <div>
                  <p className="mb-1 fw-semibold">Activity Increasing</p>
                  <p className="mb-0 fs-10 text-body-tertiary">
                    Your daily steps have increased by 15% this month.
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-start">
                <span
                  className="badge badge-phoenix badge-phoenix-success me-2"
                  style={{ marginTop: '2px' }}
                >
                  <span data-feather="check-circle" style={{ height: '12px', width: '12px' }}></span>
                </span>
                <div>
                  <p className="mb-1 fw-semibold">Recovery Score Optimal</p>
                  <p className="mb-0 fs-10 text-body-tertiary">
                    Your HRV indicates excellent recovery. Good time for intense training.
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <a href="/insights" className="btn btn-link btn-sm p-0">
                  View all insights
                  <span className="ms-1" data-feather="arrow-right" style={{ height: '12px', width: '12px' }}></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row g-3">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-12 col-sm-6 col-md-3">
                  <a
                    href="/import"
                    className="btn btn-outline-secondary w-100 d-flex flex-column align-items-center py-3"
                  >
                    <span data-feather="upload" className="mb-2"></span>
                    <span>Import Data</span>
                  </a>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <a
                    href="/metrics/custom"
                    className="btn btn-outline-secondary w-100 d-flex flex-column align-items-center py-3"
                  >
                    <span data-feather="plus-circle" className="mb-2"></span>
                    <span>Add Manual Entry</span>
                  </a>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <a
                    href="/insights"
                    className="btn btn-outline-secondary w-100 d-flex flex-column align-items-center py-3"
                  >
                    <span data-feather="zap" className="mb-2"></span>
                    <span>AI Analysis</span>
                  </a>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <a
                    href="/settings"
                    className="btn btn-outline-secondary w-100 d-flex flex-column align-items-center py-3"
                  >
                    <span data-feather="settings" className="mb-2"></span>
                    <span>Settings</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
