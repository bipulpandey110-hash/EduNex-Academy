# EduNex Academy — clean multi-page demo

This package contains the EduNex Academy frontend and Django REST API. The public website has separate pages for Home, Programs, Our Approach, Faculty, Results, Contact and Portal Login. Navigation uses real page URLs rather than in-page scrolling.

## Frontend (Windows PowerShell)

```powershell
cd frontend
npm install
npm run build
npm run dev
```

Open the local URL printed by Vite (normally `http://127.0.0.1:5173`).

### Important before publishing

- Replace the sample faculty profiles and sample testimonials with verified, approved academy details.
- Add the academy's real phone number, email and address before publishing.
- The Portal Login page is an interactive demo launcher: choose Student, Teacher or Admin to open the matching sample dashboard. It does not authenticate users. Do not use it for real student, teacher or administrator accounts until secure authentication and role permissions are implemented and tested.
- Portal demo records are illustrative sample data, not live student records.
- Admission enquiries POST to `/api/enquiries/`. The Django API and database must be configured and running for this form to save enquiries.
- `frontend/static.json` and `frontend/public/_redirects` provide SPA rewrites for static hosting. If the hosting provider does not read these files, configure a rewrite from `/*` to `/index.html` in the hosting dashboard.

## Backend (Windows PowerShell)

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python manage.py migrate
python manage.py runserver
```

The health endpoint is `/api/health/`. The enquiry endpoint is `/api/enquiries/`.

## Sales-demo notes

- This project is a presentation demo for showcasing a coaching institute website to prospective clients.
- Public sections use separate routes: `/`, `/programs`, `/approach`, `/faculty`, `/results`, `/contact` and `/portal-login`.
- Portal preview is available for Student, Teacher and Admin and uses illustrative sample data only.
- Before presenting it as a real institute website, replace the sample identity, faculty, testimonials, contact details, course availability and any other placeholder content with client-approved information.

## Deployment checklist

1. Configure production PostgreSQL and environment variables; do not use the development secret key or debug mode in production.
2. Configure CORS / allowed hosts for the actual frontend and backend domains.
3. Build the frontend with the correct `VITE_API_BASE_URL` if the API is hosted on a different domain.
4. Configure the static-host rewrite to `/index.html` so direct visits to `/programs`, `/faculty`, etc. work.
5. Test the enquiry form against the deployed API and confirm the enquiry appears in Django Admin.
6. Do not advertise the demo portal as secure or functional authentication until it is implemented.
