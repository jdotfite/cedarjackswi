# HTTPS Setup for Storyblok Visual Editor

This project is configured to work with the Storyblok Visual Editor, which requires HTTPS for security reasons.

## SSL Certificates

SSL certificates have been created using `mkcert` and are located in the project root:
- `localhost.pem` - SSL certificate
- `localhost-key.pem` - Private key

## Running the Development Environment

### Option 1: Using VS Code Tasks

1. Start the Next.js development server:
   - Open Command Palette (Ctrl+Shift+P)
   - Type "Tasks: Run Task"
   - Select "Run Next.js Dev Server"

2. Start the HTTPS proxy:
   - Open Command Palette (Ctrl+Shift+P)
   - Type "Tasks: Run Task"
   - Select "Start HTTPS Proxy for Storyblok"

### Option 2: Manual Commands

1. Start Next.js development server:
   ```bash
   npm run dev
   ```

2. In a separate terminal, start the HTTPS proxy:
   ```bash
   local-ssl-proxy --source 3010 --target 3000 --cert localhost.pem --key localhost-key.pem
   ```

## Access URLs

- **HTTP (for regular development)**: http://localhost:3000
- **HTTPS (for Storyblok Visual Editor)**: https://localhost:3010

## Storyblok Visual Editor Configuration

When setting up the Visual Editor in Storyblok:

1. Go to your Storyblok space settings
2. Navigate to "Visual Editor"
3. Set the preview URL to: `https://localhost:3010`
4. The editor will now load your site over HTTPS and enable live editing

## Important Notes

- The SSL certificates are valid until September 23, 2027
- Always use the HTTPS URL (port 3010) when working with the Storyblok Visual Editor
- The HTTP URL (port 3003) can still be used for regular development without the visual editor
