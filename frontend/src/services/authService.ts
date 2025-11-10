import api from './api';
import { useAuthStore } from '../stores/authStore';

interface SignInResponse {
  success: boolean;
  data: {
    accessToken: string;
    idToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

interface UserResponse {
  success: boolean;
  data: {
    username: string;
    email: string;
    emailVerified: boolean;
    name?: string;
    picture?: string;
  };
}

interface GoogleAuthUrlResponse {
  success: boolean;
  data: {
    url: string;
  };
}

export const authService = {
  /**
   * Sign in with email and password
   */
  async signIn(username: string, password: string): Promise<void> {
    const response = await api.post<SignInResponse>('/api/v1/auth/signin', {
      username,
      password,
    });

    const { accessToken, refreshToken } = response.data.data;
    useAuthStore.getState().setTokens(accessToken, refreshToken);

    // Fetch user info
    await this.fetchUserInfo();
  },

  /**
   * Sign out
   */
  async signOut(): Promise<void> {
    try {
      await api.post('/api/v1/auth/signout');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      useAuthStore.getState().logout();
    }
  },

  /**
   * Fetch current user info
   */
  async fetchUserInfo(): Promise<void> {
    const response = await api.get<UserResponse>('/api/v1/auth/me');
    useAuthStore.getState().setUser(response.data.data);
  },

  /**
   * Get Google OAuth URL
   */
  async getGoogleAuthUrl(): Promise<string> {
    const response = await api.get<GoogleAuthUrlResponse>('/api/v1/auth/google');
    return response.data.data.url;
  },

  /**
   * Handle OAuth callback (exchange code for tokens)
   */
  async handleOAuthCallback(code: string): Promise<void> {
    // In a production app, you would exchange the code for tokens
    // For now, we'll redirect to the backend callback endpoint
    window.location.href = `/api/v1/auth/callback?code=${code}`;
  },
};
