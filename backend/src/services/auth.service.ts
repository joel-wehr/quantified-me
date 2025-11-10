import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  GetUserCommand,
  GlobalSignOutCommand,
} from '@aws-sdk/client-cognito-identity-provider';

interface AuthConfig {
  region: string;
  userPoolId: string;
  clientId: string;
}

export class AuthService {
  private client: CognitoIdentityProviderClient;
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = config;
    this.client = new CognitoIdentityProviderClient({
      region: config.region,
    });
  }

  /**
   * Verify an access token and return user information
   */
  async verifyToken(accessToken: string) {
    try {
      const command = new GetUserCommand({
        AccessToken: accessToken,
      });

      const response = await this.client.send(command);

      // Extract user attributes into a clean object
      const attributes: Record<string, string> = {};
      response.UserAttributes?.forEach((attr) => {
        if (attr.Name && attr.Value) {
          attributes[attr.Name] = attr.Value;
        }
      });

      return {
        username: response.Username,
        attributes,
        email: attributes.email,
        emailVerified: attributes.email_verified === 'true',
        name: attributes.name,
        picture: attributes.picture,
      };
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Sign in with username and password (for email/password auth)
   */
  async signIn(username: string, password: string) {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: this.config.clientId,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
      });

      const response = await this.client.send(command);

      return {
        accessToken: response.AuthenticationResult?.AccessToken,
        idToken: response.AuthenticationResult?.IdToken,
        refreshToken: response.AuthenticationResult?.RefreshToken,
        expiresIn: response.AuthenticationResult?.ExpiresIn,
      };
    } catch (error) {
      console.error('Sign in failed:', error);
      throw new Error('Authentication failed');
    }
  }

  /**
   * Refresh an access token using a refresh token
   */
  async refreshToken(refreshToken: string) {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: this.config.clientId,
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
        },
      });

      const response = await this.client.send(command);

      return {
        accessToken: response.AuthenticationResult?.AccessToken,
        idToken: response.AuthenticationResult?.IdToken,
        expiresIn: response.AuthenticationResult?.ExpiresIn,
      };
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw new Error('Failed to refresh token');
    }
  }

  /**
   * Sign out a user globally (invalidate all tokens)
   */
  async signOut(accessToken: string) {
    try {
      const command = new GlobalSignOutCommand({
        AccessToken: accessToken,
      });

      await this.client.send(command);
    } catch (error) {
      console.error('Sign out failed:', error);
      throw new Error('Failed to sign out');
    }
  }
}

// Singleton instance
let authService: AuthService;

export function getAuthService(): AuthService {
  if (!authService) {
    const region = process.env.AWS_REGION || 'us-east-1';
    const userPoolId = process.env.COGNITO_USER_POOL_ID;
    const clientId = process.env.COGNITO_CLIENT_ID;

    if (!userPoolId || !clientId) {
      throw new Error('Missing required Cognito configuration');
    }

    authService = new AuthService({
      region,
      userPoolId,
      clientId,
    });
  }

  return authService;
}
