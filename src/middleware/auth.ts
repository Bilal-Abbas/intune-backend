import { Request, Response, NextFunction } from 'express';
import { supabaseAuth } from '../config/database';
import { AuthenticatedUser } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        error: 'Access token required',
        message: 'Please provide a valid authentication token'
      });
    }

    // Verify the JWT token with Supabase
    const { data: { user }, error } = await supabaseAuth.auth.getUser(token);

    if (error || !user) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'The provided authentication token is invalid or expired',
        details: error?.message || 'Unknown error' // Include actual error
      });
    }

    // Get user metadata for additional context
    const userMetadata = user.user_metadata || {};
    
    const authenticatedUser: AuthenticatedUser = {
      id: user.id,
      email: user.email || '',
      organizationId: userMetadata.organization_id,
      accountType: userMetadata.account_type || 'company'
    };

    req.user = authenticatedUser;
    next();
    return;
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ 
      error: 'Authentication failed',
      message: 'An error occurred during authentication'
    });
  }
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Authentication required',
      message: 'You must be authenticated to access this resource'
    });
  }
  next();
  return;
}; 