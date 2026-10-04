# Pro Installers SA website

Static one page site (plus a thank you page). Hosts free on Cloudflare Pages, or on Vercel. No server, no database, no monthly costs apart from the domain.

## Folder structure

```
pro-installers-sa/
  index.html            Home page (all sections)
  thank-you.html        Shown after the quote form is sent (served at /thank-you)
  _headers              Caching and security headers (Cloudflare Pages)
  vercel.json           Same settings if hosted on Vercel instead
  robots.txt
  sitemap.xml
  favicon.svg
  apple-touch-icon.png
  assets/
    css/style.css       Compiled Tailwind CSS (no CDN needed)
    js/main.js          Form, WhatsApp and click tracking helpers
  images/
    logo.svg, logo.png
    hero.jpg, team.jpg, og-image.jpg
    service-install.jpg, service-repair.jpg, service-maintenance.jpg
    work/               8 gallery photos
  src/input.css         Tailwind source (only needed if you change styles)
```

## 1. Before going live: find and replace the domain

The site uses `https://instafix.co.za` as the domain. If you register a different one, find and replace it in:
`index.html`, `robots.txt`, `sitemap.xml`. (The form redirect adjusts itself automatically.)

## 2. Hosting: Cloudflare Pages (recommended)

Free, commercial use allowed, unlimited bandwidth, and no GitHub needed. The folder already includes a `_headers` file for Cloudflare. (`vercel.json` is only used if you ever move to Vercel; Cloudflare ignores it.)

Use accounts owned by the business, not yours:
1. Sign up at cloudflare.com with **proinstallerssa@gmail.com**. Musara keeps the login; add yourself later as a member if you need access.
2. Dashboard > Workers & Pages > Create application > Pages > **Upload assets** (Direct Upload).
3. Name the project `pro-installers-sa`, drag in the unzipped folder (or the zip), click Deploy.
4. The site is live at `pro-installers-sa.pages.dev`. Test it on a phone.
5. To update later: open the project > Create new deployment > drag the updated folder in again.

Vercel alternative: works the same way (vercel.json is included), but the free Hobby plan is for non-commercial use, so a business site should be on Pro (about USD 20 a month).

## 3. Domain

1. Register the .co.za at a local registrar (for example Domains.co.za, Afrihost or xneelo), in the business's name and email.
2. In Cloudflare: Add a domain (Free plan). Cloudflare gives you two nameservers.
3. At the registrar, replace the nameservers with Cloudflare's. This can take a few hours.
4. In the Pages project: Custom domains > add `instafix.co.za` and `www.instafix.co.za`. Cloudflare creates the records and SSL automatically.
5. Do the find and replace in step 1 if the domain differs.

## 4. Activate the contact form (one time)

The form uses FormSubmit (free, no account). After the site is live:
1. Submit the form once yourself.
2. FormSubmit emails proinstallerssa@gmail.com an activation link. Click it.
3. From then on every request lands in that inbox. Check spam the first time and mark it "Not spam".

The "Send on WhatsApp instead" button works immediately with no setup.

## 5. Google Ads conversion tracking

1. In Google Ads: Goals > Conversions > New > Website. Create two conversions: "Quote form" and "Contact click".
2. Paste the Google tag (gtag.js) where the comment says `GOOGLE ADS` in both HTML files.
3. On `thank-you.html`, also paste the "Quote form" event snippet (fires on form sends).
4. Every call, WhatsApp and email tap already fires a `contact_click` event with a label (call_hero, whatsapp_sticky, etc). In Google Ads, import it as a conversion via GA4, or use Google Tag Manager with the `contact_click` dataLayer event.
5. Also add a call extension (call asset) with 083 985 3567 in the ads.

## 6. Replace before running ads

- **Testimonials**: the three reviews are placeholders. Replace them with real customer reviews (ideally from the Google Business Profile). Invented reviews breach Google Ads misrepresentation policy.
- **Service areas**: Centurion and Midrand were added as "in between" areas. Remove them if the client does not cover them (also in the JSON-LD schema in `index.html`).
- **Google Business Profile**: set one up at the Moreleta Park address. It matters more for "near me" searches than the website does.

## 7. Changing styles

Only needed if you edit Tailwind classes:
```
npm i tailwindcss @tailwindcss/cli
npx @tailwindcss/cli -i src/input.css -o assets/css/style.css --minify
```
Text and image changes need no rebuild.

## Google Ads keywords

Seed: aircon repair Johannesburg, AC installation Moreleta Park, mobile aircon services Pretoria, air conditioning technician near me

Additional 20:
1. aircon installation Pretoria
2. aircon repairs Pretoria East
3. aircon service Pretoria
4. aircon regas Pretoria
5. aircon installation Johannesburg
6. aircon service Johannesburg
7. aircon repair Sandton
8. aircon installation Sandton
9. air conditioner installation Centurion
10. aircon technician Moreleta Park
11. aircon cleaning Pretoria
12. split aircon installation price
13. inverter aircon installation Gauteng
14. aircon not cooling repair
15. aircon leaking water repair
16. aircon gas refill Johannesburg
17. office aircon maintenance Johannesburg
18. commercial aircon servicing Pretoria
19. Samsung aircon repair Pretoria
20. emergency aircon repair near me

Suggested negative keywords: jobs, vacancies, course, training, learnership, salary, second hand, for sale, DIY, manual, how to, car aircon, auto aircon.
