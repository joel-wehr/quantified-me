# Google OAuth Setup for AWS Cognito

This guide explains how to set up Google OAuth as an identity provider for AWS Cognito authentication.

## Prerequisites

- Google Cloud Console account
- Access to your project's Terraform configuration

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID for reference

## Step 2: Configure OAuth Consent Screen

1. Navigate to **APIs & Services** > **OAuth consent screen**
2. Select **External** user type (or Internal if using Google Workspace)
3. Click **Create**
4. Fill in the required information:
   - **App name**: Quantified Me
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
5. Click **Save and Continue**
6. On the **Scopes** page, add the following scopes:
   - `openid`
   - `profile`
   - `email`
7. Click **Save and Continue**
8. Review and click **Back to Dashboard**

## Step 3: Create OAuth 2.0 Credentials

1. Navigate to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Select **Web application** as the application type
4. Configure the OAuth client:
   - **Name**: Quantified Me Cognito
   - **Authorized JavaScript origins**: (Leave empty for now)
   - **Authorized redirect URIs**: Add the following:
     ```
     https://quantified-me-staging.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
     ```
     For production, also add:
     ```
     https://quantified-me-production.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
     ```

     **Note**: The redirect URI format is:
     ```
     https://<cognito-domain>.auth.<region>.amazoncognito.com/oauth2/idpresponse
     ```
     Replace `<cognito-domain>` with your Cognito domain (defined in cognito.tf as `${var.project_name}-${var.environment}`)

5. Click **Create**
6. Copy the **Client ID** and **Client Secret** - you'll need these for Terraform

## Step 4: Configure Terraform Variables

1. Navigate to your project's `infrastructure/terraform` directory
2. Copy `terraform.tfvars.example` to `terraform.tfvars`:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```
3. Edit `terraform.tfvars` and add your Google OAuth credentials:
   ```hcl
   google_client_id     = "YOUR_CLIENT_ID.apps.googleusercontent.com"
   google_client_secret = "YOUR_CLIENT_SECRET"
   ```

**Security Best Practice**: Instead of storing credentials in `terraform.tfvars`, you can use environment variables:
```bash
export TF_VAR_google_client_id="YOUR_CLIENT_ID.apps.googleusercontent.com"
export TF_VAR_google_client_secret="YOUR_CLIENT_SECRET"
```

## Step 5: Deploy Infrastructure

After configuring the credentials, deploy your infrastructure:

```bash
cd infrastructure
./deploy.sh staging  # or production
```

## Step 6: Update Google OAuth Redirect URIs (After Deployment)

After deploying, you'll have your actual Cognito domain. Update the redirect URIs in Google Cloud Console:

1. Get your Cognito domain from Terraform outputs:
   ```bash
   terraform output cognito_domain
   ```
2. Go back to Google Cloud Console > **APIs & Services** > **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Update the **Authorized redirect URIs** with the actual domain

## Testing Google Sign-In

Once deployed, users can sign in with Google through:
- The Cognito Hosted UI
- Your custom login page (to be implemented)

### Cognito Hosted UI URL Format:
```
https://<cognito-domain>.auth.<region>.amazoncognito.com/login?client_id=<client-id>&response_type=code&scope=email+openid+profile&redirect_uri=<your-app-url>
```

## Troubleshooting

### "redirect_uri_mismatch" Error
- Verify the redirect URI in Google Cloud Console exactly matches the Cognito domain
- Check that you're using the correct Cognito domain for your environment
- Ensure the URI includes the `/oauth2/idpresponse` path

### "invalid_client" Error
- Verify the client ID and client secret in your Terraform variables
- Ensure the Google OAuth client is enabled
- Check that the OAuth consent screen is published

### Users Can't See Google Sign-In Option
- Verify the identity provider is properly configured in Cognito
- Check that the user pool client's `supported_identity_providers` includes "Google"
- Ensure you've deployed the latest Terraform changes

## Security Considerations

1. **Never commit credentials to Git**: Add `terraform.tfvars` to `.gitignore`
2. **Use AWS Secrets Manager**: For production, consider storing Google OAuth credentials in AWS Secrets Manager and referencing them in Terraform
3. **Rotate secrets regularly**: Update your Google OAuth client secret periodically
4. **Monitor OAuth usage**: Check Google Cloud Console for unusual authentication patterns

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [AWS Cognito Identity Providers](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-identity-federation.html)
- [Cognito Hosted UI](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-app-integration.html)
