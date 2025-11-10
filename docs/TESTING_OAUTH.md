# Testing Google OAuth Authentication

This guide provides step-by-step instructions for testing the Google OAuth authentication flow in the Quantified Me application.

## Prerequisites

Before testing, ensure you have completed:

1. Google OAuth credentials setup (see `GOOGLE_OAUTH_SETUP.md`)
2. Infrastructure deployment with Cognito configuration
3. Backend and frontend environment variables configured
4. Backend server running on port 3001
5. Frontend dev server running on port 3000

## Test Scenarios

### 1. Google OAuth Sign-In Flow

**Steps:**
1. Navigate to `http://localhost:3000`
2. You should be redirected to `/login` (not authenticated)
3. Click the "Sign in with Google" button
4. You should be redirected to Cognito Hosted UI
5. Click "Continue with Google"
6. Select your Google account
7. Authorize the application
8. You should be redirected back to the application
9. You should land on `/dashboard` with your user profile visible in the navbar

**Expected Results:**
- Smooth redirect flow without errors
- User name and email populated from Google account
- Access token and refresh token stored in browser localStorage
- User profile picture displayed in navbar (if available)
- No authentication errors in console

**Common Issues:**
- **redirect_uri_mismatch**: Check Google Cloud Console redirect URIs match Cognito domain
- **Invalid client**: Verify google_client_id and google_client_secret in Terraform
- **CORS errors**: Check backend CORS_ORIGIN includes frontend URL

### 2. Email/Password Sign-In Flow

**Steps:**
1. Navigate to `/login`
2. Enter email address
3. Enter password (minimum 8 characters)
4. Click "Sign in"
5. You should be redirected to `/dashboard`

**Expected Results:**
- Form validation works (min 8 chars password)
- Error message displayed for invalid credentials
- Successful login redirects to dashboard
- User info loaded from Cognito

**Common Issues:**
- **Invalid credentials**: Ensure user exists in Cognito User Pool
- **USER_PASSWORD_AUTH not enabled**: Check Cognito client auth flows
- **Missing credentials**: Verify COGNITO_USER_POOL_ID and COGNITO_CLIENT_ID

### 3. Protected Route Access

**Steps:**
1. Sign out if authenticated
2. Try to access `/dashboard` directly
3. You should be redirected to `/login`
4. Sign in with Google or email/password
5. You should be redirected to `/dashboard`

**Expected Results:**
- Unauthenticated users cannot access protected routes
- After login, users are redirected to intended destination
- Auth state persists across page refreshes

### 4. Token Refresh Flow

**Steps:**
1. Sign in successfully
2. Open browser DevTools → Application → Local Storage
3. Note the `accessToken` value
4. Wait for token to expire (60 minutes by default)
5. Make an API request (or wait for automatic request)
6. Check Local Storage - `accessToken` should be refreshed

**Expected Results:**
- Access token automatically refreshes when expired
- No user interaction required
- API requests continue to work seamlessly
- Refresh token used to get new access token

**Manual Testing:**
```javascript
// In browser console, manually expire token
const authState = JSON.parse(localStorage.getItem('auth-storage'));
authState.state.accessToken = 'expired-token';
localStorage.setItem('auth-storage', JSON.stringify(authState));
// Then make an API request - should auto-refresh
```

### 5. Sign Out Flow

**Steps:**
1. Sign in successfully
2. Click on user avatar in navbar
3. Click "Sign out" button
4. You should be redirected to `/login`
5. Try to access `/dashboard` again
6. You should remain on `/login`

**Expected Results:**
- User successfully signed out from Cognito
- All tokens cleared from localStorage
- Redirected to login page
- Cannot access protected routes
- No user info in navbar

### 6. Concurrent Tab Sessions

**Steps:**
1. Sign in on Tab A
2. Open Tab B in same browser
3. Tab B should show authenticated state
4. Sign out on Tab A
5. Refresh Tab B
6. Tab B should redirect to login

**Expected Results:**
- Auth state synced across tabs (via localStorage)
- Sign out affects all tabs
- No stale authentication state

### 7. Direct Cognito Hosted UI Access

**Steps:**
1. Get your Cognito Hosted UI URL from backend:
   ```bash
   curl http://localhost:3001/api/v1/auth/google
   ```
2. Copy the URL from response
3. Paste in browser and navigate
4. Complete Google OAuth flow
5. Check callback handling

**Expected Results:**
- Cognito UI loads correctly
- Google sign-in option visible
- Successful authentication redirects to callback URL
- Tokens properly exchanged

## API Endpoint Testing

### Test Authentication Endpoints

Use `curl` or Postman to test backend endpoints:

#### 1. Get Google Auth URL
```bash
curl http://localhost:3001/api/v1/auth/google
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://quantified-me-staging.auth.us-east-1.amazoncognito.com/oauth2/authorize?..."
  }
}
```

#### 2. Sign In with Email/Password
```bash
curl -X POST http://localhost:3001/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user@example.com",
    "password": "your-password"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJra...",
    "idToken": "eyJra...",
    "refreshToken": "eyJra...",
    "expiresIn": 3600
  }
}
```

#### 3. Get Current User Info
```bash
curl http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "username": "google_1234567890",
    "email": "user@example.com",
    "emailVerified": true,
    "name": "John Doe",
    "picture": "https://lh3.googleusercontent.com/..."
  }
}
```

#### 4. Refresh Access Token
```bash
curl -X POST http://localhost:3001/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

#### 5. Sign Out
```bash
curl -X POST http://localhost:3001/api/v1/auth/signout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Debugging Tips

### Enable Debug Logging

**Backend:**
Add to `backend/src/services/auth.service.ts`:
```typescript
console.log('Verifying token:', accessToken.substring(0, 20) + '...');
console.log('User info:', user);
```

**Frontend:**
Add to `frontend/src/services/authService.ts`:
```typescript
console.log('Auth response:', response.data);
console.log('Tokens stored:', { accessToken, refreshToken });
```

### Check Cognito User Pool

View users in AWS Console:
1. Go to AWS Console → Cognito → User Pools
2. Select your user pool
3. Click "Users" tab
4. Find user by email or username
5. Check user attributes and status

### Inspect Network Requests

In Chrome DevTools:
1. Open Network tab
2. Filter by "Fetch/XHR"
3. Sign in with Google
4. Check requests to:
   - `/api/v1/auth/google` - Gets OAuth URL
   - Cognito OAuth endpoints
   - `/api/v1/auth/callback` - Handles callback
   - `/api/v1/auth/me` - Gets user info

### Check localStorage

In browser console:
```javascript
// View auth state
JSON.parse(localStorage.getItem('auth-storage'))

// Clear auth state
localStorage.removeItem('auth-storage')
```

## Security Testing

### Test Invalid Tokens

1. **Expired Token:**
   - Use old access token
   - Should trigger auto-refresh
   - If refresh fails, redirect to login

2. **Malformed Token:**
   ```bash
   curl http://localhost:3001/api/v1/auth/me \
     -H "Authorization: Bearer invalid-token"
   ```
   - Should return 401 Unauthorized

3. **No Token:**
   ```bash
   curl http://localhost:3001/api/v1/auth/me
   ```
   - Should return 401 Unauthorized

### Test CORS

From different origin:
```javascript
fetch('http://localhost:3001/api/v1/auth/me', {
  headers: { 'Authorization': 'Bearer TOKEN' }
})
```
- Should fail if origin not in CORS_ORIGIN

## Performance Testing

### Measure Authentication Time

In browser console:
```javascript
console.time('auth');
// Click sign in with Google
// After redirect completes:
console.timeEnd('auth');
```

**Expected Times:**
- Google OAuth flow: 2-5 seconds
- Email/password login: 500-1000ms
- Token refresh: 200-500ms

## Troubleshooting

### Issue: "redirect_uri_mismatch"

**Solution:**
1. Get Cognito domain: `terraform output cognito_hosted_ui_url`
2. Update Google Cloud Console redirect URI to:
   ```
   https://<cognito-domain>.auth.<region>.amazoncognito.com/oauth2/idpresponse
   ```

### Issue: "Invalid client"

**Solution:**
1. Verify Terraform variables are set correctly
2. Redeploy infrastructure: `./deploy.sh staging`
3. Check Cognito console for Google IDP configuration

### Issue: CORS errors

**Solution:**
1. Update `backend/.env`:
   ```
   CORS_ORIGIN=http://localhost:3000
   ```
2. Restart backend server

### Issue: Tokens not persisting

**Solution:**
1. Check browser localStorage is enabled
2. Verify no browser extensions blocking storage
3. Check Zustand persist middleware configuration

## Automated Testing

### Frontend Tests (Vitest)

```bash
cd frontend
npm test
```

### Backend Tests (Vitest)

```bash
cd backend
npm test
```

### E2E Tests (Future)

Plan for Playwright/Cypress tests:
- Test complete OAuth flow
- Test protected route access
- Test token refresh
- Test sign out

## Success Criteria

Authentication is working correctly when:

- ✅ Users can sign in with Google
- ✅ Users can sign in with email/password
- ✅ Protected routes are inaccessible when logged out
- ✅ User info displays correctly in navbar
- ✅ Access tokens auto-refresh
- ✅ Sign out clears all auth state
- ✅ Auth state persists across page refreshes
- ✅ No console errors during auth flow
- ✅ API requests include proper Authorization headers
- ✅ CORS configured correctly

## Next Steps

After successful testing:
1. Document any issues found
2. Create production Cognito configuration
3. Update redirect URIs for production domain
4. Set up monitoring for auth failures
5. Implement rate limiting for auth endpoints
6. Add MFA support (optional)
7. Set up email verification flow
