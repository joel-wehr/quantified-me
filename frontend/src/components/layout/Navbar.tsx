import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { authService } from '../../services/authService';

export default function Navbar() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const handleSignOut = async () => {
    await authService.signOut();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-top fixed-top navbar-expand" id="navbarDefault">
      <div className="collapse navbar-collapse justify-content-between">
        <div className="navbar-logo">
          <button
            className="btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarVerticalCollapse"
            aria-controls="navbarVerticalCollapse"
            aria-expanded="false"
            aria-label="Toggle Navigation"
          >
            <span className="navbar-toggle-icon">
              <span className="toggle-line"></span>
            </span>
          </button>
          <a className="navbar-brand me-1 me-sm-3" href="/">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <h5 className="logo-text ms-2 d-none d-sm-block">Quantified Me</h5>
              </div>
            </div>
          </a>
        </div>

        <ul className="navbar-nav navbar-nav-icons flex-row">
          <li className="nav-item">
            <div className="theme-control-toggle px-2">
              <input
                className="form-check-input ms-0 theme-control-toggle-input"
                type="checkbox"
                data-theme-control="phoenixTheme"
                value="dark"
                id="themeControlToggle"
              />
              <label
                className="mb-0 theme-control-toggle-label theme-control-toggle-light"
                htmlFor="themeControlToggle"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Switch theme"
              >
                <span className="icon" data-feather="moon"></span>
              </label>
              <label
                className="mb-0 theme-control-toggle-label theme-control-toggle-dark"
                htmlFor="themeControlToggle"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Switch theme"
              >
                <span className="icon" data-feather="sun"></span>
              </label>
            </div>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <span data-feather="bell" style={{ height: '20px', width: '20px' }}></span>
            </a>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link lh-1 pe-0"
              id="navbarDropdownUser"
              href="#!"
              role="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="avatar avatar-l">
                {user?.picture ? (
                  <img className="rounded-circle" src={user.picture} alt={user.name || user.email} />
                ) : (
                  <div className="avatar-name rounded-circle">
                    <span>{user?.name?.[0] || user?.email?.[0] || 'U'}</span>
                  </div>
                )}
              </div>
            </a>
            <div
              className="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border"
              aria-labelledby="navbarDropdownUser"
            >
              <div className="card position-relative border-0">
                <div className="card-body p-0">
                  <div className="text-center pt-4 pb-3">
                    <div className="avatar avatar-xl">
                      {user?.picture ? (
                        <img className="rounded-circle" src={user.picture} alt={user.name || user.email} />
                      ) : (
                        <div className="avatar-name rounded-circle">
                          <span>{user?.name?.[0] || user?.email?.[0] || 'U'}</span>
                        </div>
                      )}
                    </div>
                    <h6 className="mt-2 text-body-emphasis">{user?.name || user?.email || 'User'}</h6>
                  </div>
                </div>
                <div className="overflow-auto scrollbar" style={{ height: '10rem' }}>
                  <ul className="nav d-flex flex-column mb-2 pb-1">
                    <li className="nav-item">
                      <a className="nav-link px-3" href="#!">
                        <span className="me-2 text-body" data-feather="user"></span>
                        <span>Profile</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link px-3" href="#!">
                        <span className="me-2 text-body" data-feather="pie-chart"></span>
                        Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link px-3" href="#!">
                        <span className="me-2 text-body" data-feather="settings"></span>
                        Settings
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-footer p-0 border-top border-translucent">
                  <div className="px-3">
                    <button
                      className="btn btn-phoenix-secondary d-flex flex-center w-100"
                      onClick={handleSignOut}
                    >
                      <span className="me-2" data-feather="log-out"></span>
                      Sign out
                    </button>
                  </div>
                  <div className="my-2 text-center fw-bold fs-10 text-body-quaternary">
                    <a className="text-body-quaternary me-1" href="#!">Privacy policy</a>
                    •
                    <a className="text-body-quaternary mx-1" href="#!">Terms</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
