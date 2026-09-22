import { cache } from "react";
import { getCareerRoles } from "./sanityQueries";

// A failed CMS request must fail the build rather than silently drop job URLs.
export const getStaticCareerRoles = cache(async () => {
  const roles = await getCareerRoles();
  const seen = new Set<string>();
  for (const role of roles) {
    if (!/^[a-zA-Z0-9_-][a-zA-Z0-9._-]*$/.test(role.slug) || role.slug === "__empty__" || seen.has(role.slug)) {
      throw new Error("Career roles require unique, URL-safe slugs: " + role._id);
    }
    seen.add(role.slug);
  }
  return roles;
});
