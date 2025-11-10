import { Router, Request, Response } from 'express';
import { getAuthService } from '../services/auth.service';
import { authenticate } from '../middleware/auth.middleware';
import { z } from 'zod';

const router = Router();

// Validation schemas
const signInSchema = z.object({
  username: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

/**
 * POST /api/v1/auth/signin
 * Sign in with email and password
 */
router.post('/signin', async (req: Request, res: Response) => {
  try {
    const { username, password } = signInSchema.parse(req.body);

    const authService = getAuthService();
    const tokens = await authService.signIn(username, password);

    res.json({
      success: true,
      data: tokens,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.errors,
      });
    }

    console.error('Sign in error:', error);
    res.status(401).json({
      error: 'Authentication Failed',
      message: 'Invalid credentials',
    });
  }
});

/**
 * POST /api/v1/auth/refresh
 * Refresh access token using refresh token
 */
router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = refreshTokenSchema.parse(req.body);

    const authService = getAuthService();
    const tokens = await authService.refreshToken(refreshToken);

    res.json({
      success: true,
      data: tokens,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation Error',
        details: error.errors,
      });
    }

    console.error('Token refresh error:', error);
    res.status(401).json({
      error: 'Token Refresh Failed',
      message: 'Invalid or expired refresh token',
    });
  }
});

/**
 * POST /api/v1/auth/signout
 * Sign out (invalidate all tokens)
 */
router.post('/signout', authenticate, async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader!.substring(7);

    const authService = getAuthService();
    await authService.signOut(token);

    res.json({
      success: true,
      message: 'Successfully signed out',
    });
  } catch (error) {
    console.error('Sign out error:', error);
    res.status(500).json({
      error: 'Sign Out Failed',
      message: 'Failed to sign out',
    });
  }
});

/**
 * GET /api/v1/auth/me
 * Get current user info
 */
router.get('/me', authenticate, (req: Request, res: Response) => {
  res.json({
    success: true,
    data: req.user,
  });
});

/**
 * GET /api/v1/auth/google
 * Get Google OAuth URL for Cognito Hosted UI
 */
router.get('/google', (req: Request, res: Response) => {
  const cognitoDomain = process.env.COGNITO_DOMAIN;
  const clientId = process.env.COGNITO_CLIENT_ID;
  const redirectUri = process.env.COGNITO_REDIRECT_URI || 'http://localhost:3000';
  const region = process.env.AWS_REGION || 'us-east-1';

  if (!cognitoDomain || !clientId) {
    return res.status(500).json({
      error: 'Configuration Error',
      message: 'Missing Cognito configuration',
    });
  }

  const authUrl = `https://${cognitoDomain}.auth.${region}.amazoncognito.com/oauth2/authorize?` +
    `client_id=${clientId}&` +
    `response_type=code&` +
    `scope=email+openid+profile&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `identity_provider=Google`;

  res.json({
    success: true,
    data: {
      url: authUrl,
    },
  });
});

/**
 * GET /api/v1/auth/callback
 * Handle OAuth callback (exchange code for tokens)
 */
router.get('/callback', async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({
      error: 'Invalid Request',
      message: 'Missing authorization code',
    });
  }

  // In a real implementation, you would exchange the code for tokens
  // This typically requires making a request to Cognito's token endpoint
  // For now, we'll redirect to the frontend with the code
  const redirectUri = process.env.COGNITO_REDIRECT_URI || 'http://localhost:3000';
  res.redirect(`${redirectUri}?code=${code}`);
});

export default router;
