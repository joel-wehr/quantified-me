import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
      console.error('Sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      const authUrl = await authService.getGoogleAuthUrl();
      window.location.href = authUrl;
    } catch (err) {
      setError('Failed to initialize Google sign-in');
      console.error('Google sign-in error:', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row min-vh-100 flex-center g-0">
        <div className="col-lg-8 col-xxl-5 py-3">
          <div className="card overflow-hidden z-1">
            <div className="card-body p-0">
              <div className="row g-0 h-100">
                <div className="col-md-5 text-center bg-card-gradient">
                  <div className="position-relative p-4 pt-md-5 pb-md-7">
                    <div className="bg-holder bg-auth-card-shape"></div>
                    <div className="z-1 position-relative">
                      <a
                        className="link-light mb-4 font-sans-serif fs-4 d-inline-block fw-bolder"
                        href="/"
                      >
                        Quantified Me
                      </a>
                      <p className="opacity-75 text-white">
                        Your personal health intelligence platform. Track, analyze, and
                        optimize your wellbeing with AI-powered insights.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 mb-4 mt-md-4 mb-md-5">
                    <p className="text-white">
                      Don't have an account?
                      <br />
                      <a
                        className="text-decoration-underline link-light"
                        href="/register"
                      >
                        Get started!
                      </a>
                    </p>
                  </div>
                </div>

                <div className="col-md-7 d-flex flex-center">
                  <div className="p-4 p-md-5 flex-grow-1">
                    <h3>Sign In</h3>
                    <p className="text-muted">Access your health dashboard</p>

                    {error && (
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setError('')}
                          aria-label="Close"
                        ></button>
                      </div>
                    )}

                    <button
                      className="btn btn-lg btn-outline-google w-100 mb-3"
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      <span className="fab fa-google me-2" data-fa-transform="grow-8"></span>
                      {isLoading ? 'Loading...' : 'Sign in with Google'}
                    </button>

                    <div className="position-relative mt-4 mb-4">
                      <hr />
                      <div className="divider-content-center">or use email</div>
                    </div>

                    <form onSubmit={handleEmailSignIn}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                        <input
                          className="form-control"
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          className="form-control"
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="row flex-between-center">
                        <div className="col-auto">
                          <div className="form-check mb-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="rememberMe"
                            />
                            <label className="form-check-label mb-0" htmlFor="rememberMe">
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-auto">
                          <a className="fs--1" href="/forgot-password">
                            Forgot Password?
                          </a>
                        </div>
                      </div>

                      <div className="mb-3">
                        <button
                          className="btn btn-primary d-block w-100 mt-3"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
