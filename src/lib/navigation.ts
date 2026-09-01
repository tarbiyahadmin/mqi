"use client";

export { default as Link } from "next/link";
export { usePathname, useSearchParams, useParams, useRouter } from "next/navigation";

export function paramAsString(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}
