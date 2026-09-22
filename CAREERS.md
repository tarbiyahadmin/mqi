# Careers and static content

The site deploys the static `out/` export on Netlify. Careers, Blog, Book A Meet, Donate, Financial Aid, Contact, Home, About and Programs content is read from Sanity during the build. Publish CMS changes and rebuild/redeploy the website to update the exported content. Newly published job URLs become available after that deployment.

Each published career role has a page at `/careers/<slug>/`. Existing documents without a slug use their stable document ID, so no content migration is needed. The Sanity role editor now includes a unique URL slug generated from the title. Keep a published slug unchanged to preserve shared URLs; changing it requires a redirect from the old URL in the hosting configuration.

Job pages include all role details and the referenced application form page. Publish that form with its slug so the build can generate its destination. Unknown job URLs return the static 404 page. CMS fetch failures or duplicate/invalid job slugs fail the job build instead of silently publishing broken links.

Validation: run `npm run lint`, `npm run typecheck`, `npm run build`, then `node scripts/verify-careers.mjs`. The verification script compares exported HTML with published CMS roles and checks linked application pages. It needs network access to the configured Sanity dataset, as does the production build (which also downloads Google fonts).
