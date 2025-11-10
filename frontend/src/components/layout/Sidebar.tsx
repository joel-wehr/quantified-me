export default function Sidebar() {
  return (
    <nav className="navbar navbar-vertical navbar-expand-lg">
      <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
        <div className="navbar-vertical-content">
          <ul className="navbar-nav flex-column" id="navbarVerticalNav">
            {/* Dashboard */}
            <li className="nav-item">
              <div className="nav-item-wrapper">
                <a className="nav-link label-1 active" href="/" role="button">
                  <div className="d-flex align-items-center">
                    <span className="nav-link-icon">
                      <span data-feather="pie-chart"></span>
                    </span>
                    <span className="nav-link-text-wrapper">
                      <span className="nav-link-text">Dashboard</span>
                    </span>
                  </div>
                </a>
              </div>
            </li>

            {/* Metrics */}
            <li className="nav-item">
              <div className="nav-item-wrapper">
                <a
                  className="nav-link dropdown-indicator label-1"
                  href="#nv-metrics"
                  role="button"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="nv-metrics"
                >
                  <div className="d-flex align-items-center">
                    <div className="dropdown-indicator-icon-wrapper">
                      <span className="fas fa-caret-right dropdown-indicator-icon"></span>
                    </div>
                    <span className="nav-link-icon">
                      <span data-feather="activity"></span>
                    </span>
                    <span className="nav-link-text">Metrics</span>
                  </div>
                </a>
                <div className="parent-wrapper label-1">
                  <ul className="nav collapse parent" data-bs-parent="#navbarVerticalCollapse" id="nv-metrics">
                    <li className="nav-item">
                      <a className="nav-link" href="/metrics/activity">
                        <div className="d-flex align-items-center">
                          <span className="nav-link-text">Activity</span>
                        </div>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/metrics/sleep">
                        <div className="d-flex align-items-center">
                          <span className="nav-link-text">Sleep</span>
                        </div>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/metrics/recovery">
                        <div className="d-flex align-items-center">
                          <span className="nav-link-text">Recovery</span>
                        </div>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/metrics/custom">
                        <div className="d-flex align-items-center">
                          <span className="nav-link-text">Custom Metrics</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* Data Import */}
            <li className="nav-item">
              <div className="nav-item-wrapper">
                <a className="nav-link label-1" href="/import" role="button">
                  <div className="d-flex align-items-center">
                    <span className="nav-link-icon">
                      <span data-feather="upload"></span>
                    </span>
                    <span className="nav-link-text-wrapper">
                      <span className="nav-link-text">Data Import</span>
                    </span>
                  </div>
                </a>
              </div>
            </li>

            {/* AI Insights */}
            <li className="nav-item">
              <div className="nav-item-wrapper">
                <a className="nav-link label-1" href="/insights" role="button">
                  <div className="d-flex align-items-center">
                    <span className="nav-link-icon">
                      <span data-feather="zap"></span>
                    </span>
                    <span className="nav-link-text-wrapper">
                      <span className="nav-link-text">AI Insights</span>
                    </span>
                    <span className="badge badge-phoenix badge-phoenix-warning ms-2">AI</span>
                  </div>
                </a>
              </div>
            </li>

            {/* Divider */}
            <li className="nav-item">
              <hr className="navbar-vertical-line" />
            </li>

            {/* Settings */}
            <li className="nav-item">
              <div className="nav-item-wrapper">
                <a className="nav-link label-1" href="/settings" role="button">
                  <div className="d-flex align-items-center">
                    <span className="nav-link-icon">
                      <span data-feather="settings"></span>
                    </span>
                    <span className="nav-link-text-wrapper">
                      <span className="nav-link-text">Settings</span>
                    </span>
                  </div>
                </a>
              </div>
            </li>

            {/* Documentation */}
            <li className="nav-item">
              <div className="nav-item-wrapper">
                <a className="nav-link label-1" href="/docs" role="button">
                  <div className="d-flex align-items-center">
                    <span className="nav-link-icon">
                      <span data-feather="book-open"></span>
                    </span>
                    <span className="nav-link-text-wrapper">
                      <span className="nav-link-text">Documentation</span>
                    </span>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
