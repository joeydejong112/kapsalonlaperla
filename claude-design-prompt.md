# Claude design prompt

You are improving an existing Next.js 15 demo website for a fictional hair salon (Demo Salon).

Project path:
`C:\Users\Joey\Documents\JDJFreelance\kapsalonlaperla`

Stack:
- Next.js 15 app router
- Tailwind CSS v4, CSS-first config in `app/globals.css`
- TypeScript
- `motion/react`
- One-page site: `app/page.tsx` renders `components/home-page.tsx`

Current page structure:
Header, Hero, About, Services, Pricing, Booking, Reviews, Faq, Location, Footer, StickyCta.

Important constraints:
- Do not change prices.
- Do not invent new salon facts.
- Do not remove bilingual NL/EN support from `lib/content.ts`.
- Do not add dependencies unless absolutely necessary.
- Keep the site a practical conversion-focused salon website, not a generic agency landing page.
- Real salon photos already live in `public/images/` and are referenced through `lib/salon-images.json`.
- Preserve the booking widget behavior: treatment -> day/time -> details -> WhatsApp link activates when name is entered.

Your goal:
Improve the visual design and UX quality while keeping the business content truthful and local.

Design direction:
Make it feel like a warm, skilled neighborhood salon with enough polish to look trustworthy and current. Avoid generic luxury beauty-site tropes, oversized empty hero sections, purple-blue gradients, glass cards, decorative blobs, and AI-looking repeated icon cards. The site should feel personal, practical, and refined.

Focus areas:
1. Stronger art direction for the real photos
   - Use the salon/client photos intentionally.
   - Improve crops, layering, and visual rhythm.
   - Do not hide the photos behind heavy overlays unless readability requires it.

2. Better typography hierarchy
   - Improve heading/body contrast and scanning.
   - Keep copy unchanged unless a tiny label-level UX fix is necessary.
   - Make Dutch copy feel primary and natural, with English support still clean.

3. More polished section flow
   - Reduce any template-like repetition.
   - Vary rhythm between About, Services, Pricing, Booking, and Reviews.
   - Keep the first screen focused on identity, trust, and booking.

4. Booking widget polish
   - Keep the same three-step logic.
   - Improve perceived clarity and confidence.
   - Make selected states, disabled states, and WhatsApp handoff feel deliberate.

5. Mobile quality
   - Check 390px and desktop layouts.
   - Ensure no text overlaps, no cramped buttons, no layout jumps.
   - Sticky CTA must remain useful, not intrusive.

Before editing:
- Inspect the current implementation first.
- Identify the smallest set of components/styles that need design changes.
- Explain the design direction briefly before implementing.

After editing:
- Run `npm run build`.
- Run the dev server and verify the homepage renders with real photos.
- Verify booking still works through treatment, day/time, details, and enabled WhatsApp link after entering a name.
- Report exact files changed and build output.
