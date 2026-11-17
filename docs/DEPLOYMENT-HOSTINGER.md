# Deploying to Hostinger

This site is a **Next.js server app** (it pre-renders every page, but the contact form runs on the server).
It therefore needs Hostinger's **Node.js Web App** hosting, not plain static hosting.

## 1. Required plan

Node.js web apps are available on **Business Web Hosting** or a **Cloud** plan (Startup, Professional, Enterprise, Enterprise Plus).
Single/Premium shared plans do **not** run Node.js apps. On those plans the site would have to be exported as static files and the
contact form would not work, so they are not supported for this project. (VPS also works, but needs manual setup with PM2/Nginx.)

Next.js is a supported framework preset. Hostinger auto-detects it from `package.json` and starts the Next.js standalone server itself
(no entry file needed). This project is configured with `output: "standalone"` for exactly that.

## 2. Deploy (recommended: GitHub)

1. Push this project to a GitHub repository (private is fine).
2. hPanel → **Websites** → **Add Website** → **Node.js web app**.
3. **Import your Git repository** → **Connect with GitHub** → authorise the Hostinger GitHub App for the repo → select it → **Deploy**.
4. Check the pre-filled **Build settings**:

   | Field | Value |
   |---|---|
   | Framework preset | **Next.js** |
   | Branch | `main` |
   | Node.js version | **22** (LTS) |
   | Package manager | npm (auto-detected from `package-lock.json`) |
   | Build command | `npm run build` |
   | Output directory | `.next` (leave the detected default) |
   | Entry file | leave empty (not needed for Next.js) |

5. Add the **Environment variables** from `.env.example` (see section 3).
6. Click **Deploy**. Every later push to `main` rebuilds and redeploys automatically.

**Alternative (ZIP upload):** from the project folder run
`zip -r neusix.zip . --exclude "node_modules/*" --exclude ".git/*" --exclude ".next/*" --exclude "qa-shots/*"`, then hPanel → **Add Website** →
**Node.js web app** → **Upload your files** → upload the zip → confirm the settings above → **Deploy**.
If the domain already has a website on the plan, remove that website first. The deploy flow creates a fresh slot for the domain.

## 3. Environment variables

| Key | Example | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.neusix.com` | Canonical URLs, sitemap, Open Graph. No trailing slash. Needed at **build** time. |
| `SMTP_HOST` | `smtp.hostinger.com` | Hostinger Email outgoing server |
| `SMTP_PORT` | `465` | SSL. If you get encryption errors, use `587` (STARTTLS) |
| `SMTP_USER` | `website@neusix.com` | Full mailbox address |
| `SMTP_PASS` | (mailbox password) | Keep secret; set only in hPanel |
| `CONTACT_TO` | `hello@neusix.com` | Where enquiries arrive (comma-separate several) |
| `CONTACT_FROM` | `NeuSix Website <website@neusix.com>` | Optional; must be allowed by the SMTP account |
| `CONTACT_WEBHOOK_URL` | `https://…` | Optional: also send each enquiry as JSON to a CRM/automation |

Create the sending mailbox (e.g. `website@neusix.com`) under hPanel → **Emails** first.
After changing variables, **Restart** (or redeploy) the app.

## 4. Domain and DNS

* If the domain is registered/managed at Hostinger, choose it during the Add Website flow and DNS is handled for you.
* If the domain is elsewhere, either point its **nameservers** to Hostinger, or keep your DNS and add the
  **A record** (and `www` CNAME/A record) shown in hPanel for the website. The values are specific to your server, so copy them from hPanel.
* Keep existing **MX** records if email is hosted elsewhere. If you use Hostinger Email, use the MX/SPF/DKIM values hPanel shows.
* **Switching from Webflow:** remove the domain from the Webflow project (Project settings → Publishing) only once the Hostinger
  site is live on a temporary URL and has passed the checklist below; then change DNS. Expect up to 24h propagation.

## 5. SSL

Hostinger issues a free managed SSL certificate automatically once DNS points to the server. Check under hPanel → **Security → SSL**
that it is **Active** for both `neusix.com` and `www.neusix.com`, and enable **Force HTTPS**.
The site's canonical host is `https://www.neusix.com` (as on the live site). If you prefer the bare domain, change `NEXT_PUBLIC_SITE_URL`.

## 6. Post-deployment checklist

- [ ] Home, all 6 service pages, services hub, Industries, Case Studies (+6), Resources (+tag pages), About, Contact load over HTTPS
- [ ] `https://www.neusix.com/sitemap.xml` lists 28 URLs; `robots.txt` references it
- [ ] An unknown URL shows the NeuSix 404 page
- [ ] `/services`, `/contact`, `/case-studies` redirect to the right pages
- [ ] Desktop dropdowns and the mobile menu work; Lottie dials animate on Home and service pages
- [ ] **Contact form:** submit a real test enquiry → it arrives at `CONTACT_TO` with Reply-To set to the visitor's email
- [ ] Contact form with an invalid email shows inline errors
- [ ] Favicon shows; sharing a page link shows the right title/description
- [ ] Run Lighthouse (mobile) on Home and one service page
- [ ] Submit the sitemap in Google Search Console

## 7. Notes

* Apps on this hosting sleep after a period without traffic and start again on the next request, so the first visit after idle may be slightly slower.
* The contact form's spam rate limit is kept in server memory (5 submissions per IP per 10 minutes) and resets on restart.
* Run locally exactly like production: `npm run build && npm run start:standalone`.
