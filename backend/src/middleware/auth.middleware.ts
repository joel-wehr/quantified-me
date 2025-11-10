import { Request, Response, NextFunction } from 'express';
import { getAuthService } from '../services/auth.service';

// Extend Express Request to include user info
declare global {
  namespace Express {
    interface Request {
      user?: {
        username: string;
        email: string;
        emailVerified: boolean;
        name?: string;
        picture?: string;
        attributes: Record<string, string>;
      };
    }
  }
}

/**
 * Middleware to verify JWT tokens from AWS Cognito
 */
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header',
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token with Cognito
    const authService = getAuthService();
    const user = await authService.verifyToken(token);

    // Attach user info to request
    req.user = user;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired token',
    });
  }
}

/**
 * Optional authentication middleware - doesn't fail if no token
 */
export async function optionalAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const authService = getAuthService();
      const user = await authService.verifyToken(token);
      req.user = user;
    }
    next();
  } catch (error) {
    // Silently continue without user info
    next();
  }
}
