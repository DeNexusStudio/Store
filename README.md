# Luvitus Global Limited — Herbal Storefront

Responsive static storefront built with HTML, CSS and vanilla JavaScript. Includes product categories, detailed product information, size variants, cart, policy acknowledgement, WhatsApp checkout, WhatsApp consultation/support links, testimonial and product-guide video sections, contact form integration, theme switcher and PWA installation support.

## 1. How to replace photos, logo and cart icon

Open the `assets` folder. Replace the placeholder images with your own files and keep the filenames below (or change the matching path in `config.js` / `products.js`):

| Website area | File to replace |
|---|---|
| Header and footer logo | `logo.svg` |
| Cart icon | `cart.svg` |
| Homepage hero photo | `hero-placeholder.svg` |
| Our story photo | `story-placeholder.svg` |
| Tonic product photo | `product-tonic.svg` |
| Capsules product photo | `product-capsules.svg` |
| Cream product photo | `product-cream.svg` |
| Soap product photo | `product-soap.svg` |
| Installed app icon | `icon-192.png` and `icon-512.png` |

For best results use JPG, PNG or WebP for photos. If you replace an SVG placeholder with a JPG/PNG/WebP, update its filename/path in `config.js` or `products.js`. The logo and cart icon can be SVG or PNG; update `config.js` paths if needed. After changing images on an already deployed site, hard-refresh the browser; the service worker cache version is `luvitus-store-v2` and should be incremented after future asset changes if stale files persist.

**Important:** this is a code-managed assets folder, not an online media manager. To change a photo, open the project folder on your computer and copy your image into `assets`; then redeploy the updated project.

## 2. Edit products and product detail information

Open `products.js`. Each product supports:
- `name`, `category`, `description`
- `ingredients` (array or text)
- `dosage`, `usage`, `warnings`, `storage`, `otherInfo`
- `image` (path to a file in `assets`)
- optional `video` (direct MP4/WebM URL)
- owner-managed `rating` and `ratingCount`
- `variants` with `size`, `price`, `oldPrice`
- product-specific `returnPolicy`

Add new products by copying an object and giving it a unique `id`. Categories are generated automatically. Replace all sample dosage, ingredient, warning and product copy with information verified from the product manufacturer/label. Do not publish unverified health or treatment claims.

## 3. Add customer testimonials and product guides

Open `config.js`, then add video entries under `STORE.videos.testimonials` or `STORE.videos.guides`:

```js
videos: {
  testimonials: [
    { title: "Customer experience", embedUrl: "https://www.youtube.com/embed/VIDEO_ID" }
  ],
  guides: [
    { title: "How to use the tonic", description: "Product directions", embedUrl: "https://www.youtube.com/embed/VIDEO_ID" }
  ]
}
```

Use the YouTube **embed** URL (not the normal watch URL), e.g. `https://www.youtube.com/embed/VIDEO_ID`. Vimeo player embed URLs are also supported. Videos must be hosted and publicly viewable/embeddable. Do not publish testimonials without the customer's permission. Testimonials are personal experiences, not proof or a guarantee of health outcomes.

## 4. WhatsApp, email and social links

In `config.js`, replace:
- `whatsappNumber`: order/general WhatsApp number
- `consultationWhatsapp`: free consultation booking number
- `supportWhatsapp`: product support number
- `email`: store email address
- `formspreeEndpoint`: your Formspree form endpoint
- social media URLs under `socials`

WhatsApp numbers must include country code and digits only. For Nigeria, use `234...`, without a leading 0 or plus sign. Consultation and support can use the same number or separate numbers.

## 5. Contact form email delivery

A static website cannot send email directly or safely store email credentials. Create a form at https://formspree.io/, set the recipient email to the store owner, and copy its endpoint into `formspreeEndpoint`. Never put SMTP passwords or private API keys in frontend files.

## 6. Preview and deploy

Run the project through a local web server (for example VS Code Live Server); do not open `index.html` directly as a file. Deploy the project folder to Firebase Hosting or Vercel. For Firebase, run `firebase login`, `firebase init hosting`, and `firebase deploy` from this folder. Use the current folder as the public directory and do not overwrite the project files.

## 7. Important limitations

- This is a frontend-only storefront. Product information and prices are public and can be inspected or changed in a visitor's browser; confirm final price, stock, payment and delivery in WhatsApp.
- Cart data is stored locally on the customer's device, not in a server-side order database.
- WhatsApp checkout opens a prefilled message; the customer must press Send.
- Ratings are owner-managed display values, not verified customer reviews.
- The return/refund form sends a claim to WhatsApp; it does not automatically approve refunds or verify purchases.
- Do not request unnecessary sensitive payment/account details through an unsecured form or chat.
