# Email Setup Guide

## EmailJS Configuration

To enable email functionality, you need to:

1. **Sign up at [EmailJS](https://www.emailjs.com/)**
2. **Create an Email Service** (Gmail, Outlook, etc.)
3. **Create an Email Template**
4. **Get your credentials**

## Update Contact.tsx

Replace these placeholders in `src/components/Contact.tsx`:

```typescript
await emailjs.send(
  'YOUR_SERVICE_ID',     // Replace with your EmailJS service ID
  'YOUR_TEMPLATE_ID',    // Replace with your EmailJS template ID
  templateParams,
  'YOUR_PUBLIC_KEY'      // Replace with your EmailJS public key
);
```

## Email Template Variables

Your EmailJS template should include:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - Message content
- `{{to_email}}` - Your email (mohamedabu.basith@gmail.com)

## Security Note

The public key is safe to expose in frontend code, but keep your service ID and template ID private in production.