# Web3Forms Reservation Form Setup

## Quick Setup (2 minutes)

### 1. Get Your Access Key
1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email address in the "Create Access Key" section
3. Click "Create Access Key"
4. Check your email for the access key

### 2. Add Access Key to Environment
1. Copy your access key from the email
2. Add it to your `.env.local` file:
   ```
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_actual_access_key_here
   ```

### 3. Deploy and Test
1. Deploy your site anywhere (Vercel, Netlify, etc.)
2. Test the form at `/reservation`
3. Check your email for submissions

## Features Included

✅ **250 free submissions/month**  
✅ **No backend required**  
✅ **Spam protection**  
✅ **Custom email templates**  
✅ **File attachments support**  
✅ **Works with any hosting**  
✅ **GDPR compliant**  

## Form Fields
- Name (required)
- Phone (required)
- Date (required)
- Time (required)
- Number of Seats (required)
- Email (required)
- Notes (optional)

## Email Format
You'll receive emails with subject: "New Basement Reservation Request"
From: "Cedar Jacks Reservation Form"

## Advanced Options (Optional)

### Custom Thank You Page
Add to your `.env.local`:
```
NEXT_PUBLIC_FORM_REDIRECT_URL=https://yourdomain.com/thank-you
```

### Email Notifications
- All submissions go directly to your email
- No dashboard login required
- View all submissions in your email inbox

## Storyblok Setup

### Component Fields to Add:
- `title` (Text) - Form title
- `subtitle` (Textarea) - Optional description
- `background_image` (Asset) - Optional background image
- `success_message` (Textarea) - Optional custom success message

### Create Story:
1. Create new story: `/reservation`
2. Set content type: `reservation_form`
3. Fill in your content
4. Publish

That's it! Your form is ready to receive reservations.
