# Stroke Recovery Queensland: launch checklist

## Before you publish
1. **Set the real domain.** `BASE` in `generator/frame.py` is a placeholder (strokerecoveryqueensland.com.au). Change it, then run `python3 build.py`. Canonicals, sitemap and schema all update.
2. **All 30 locations show as available.** Make sure that matches what you can actually deliver. Every location page says "we take referrals from here now" and "we will tell you plainly what we can arrange, and when". Keep that second line honest. If you cannot staff an area, say so on the phone.
3. **Claims you have told me are true** (150+ stroke-trained staff, 90+ Queenslanders supported, 24/7 phone, same-day response, Courier-Mail and 7NEWS logos). Keep evidence for each. Under the Australian Consumer Law you must be able to back them up. "90+ supported" and "150+ staff" are the easiest to challenge. The logos should link to the real stories.
4. **Replace stock photos** with your own, or confirm the licence.
5. **Testimonials.** Slots are empty until you send quotes with written consent.
6. **Privacy policy, terms, service agreement:** have a lawyer review.
7. **Condition and guide pages** are general information, written for review by a clinician. Have a GP or allied health professional read them once.
8. **Registration.** The site says you are not NDIS-registered and support plan-managed and self-managed participants only. Update when that changes.

## SEO built in
Title, description, canonical, Open Graph, JSON-LD (ProfessionalService, Service, FAQPage, MedicalWebPage, Article, BreadcrumbList), sitemap.xml and robots.txt on every page. 30 location pages, 15 condition pages, 8 service pages, 11 professional pages.

## After launch
- Verify the site in Google Search Console and submit sitemap.xml.
- Create and verify a Google Business Profile (service area: Queensland).
- Legitimate backlinks: Stroke Foundation and Aphasia Australia directories, local chambers, Carer Gateway, NDIS provider finder (when registered), hospital allied health contacts, local news stories (then add the real link behind the logo).

## Also in this pack
- `downloads/` has the Referrer Pack and Family Welcome Guide PDFs (regenerate with `python3 pdfs.py` in the generator folder).
- `photo-credits.html` is hidden from search engines (noindex) until you fill in the credit and licence column. Remove `noindex=True` in `extra.py` when done.
- See the separate fact-check list for hospitals, towns, claims and clinical content.
