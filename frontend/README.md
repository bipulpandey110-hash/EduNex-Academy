# EduNex Academy frontend

React + Vite public coaching-academy website. Each primary section is a separate route: `/`, `/programs`, `/approach`, `/faculty`, `/results`, `/contact`, `/portal-login`, and `/portal-demo`.

## Local setup

```powershell
npm install
npm run dev
npm run build
```

The public enquiry form sends a POST request to `${VITE_API_BASE_URL || '/api'}/enquiries/`. Set `VITE_API_BASE_URL` in the hosting environment when the API is on another domain.

The portal login and portal dashboard are preview-only and do not provide authentication or live records. Replace sample faculty and testimonial content with approved academy information before launch.
