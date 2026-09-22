import { notFound } from "next/navigation";
import { getStaticCareerRoles } from "@/lib/careers";
import { getCareersPage } from "@/lib/sanityQueries";
import { careerDetailPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/metadata";
import { withStaticExportFallback } from "@/lib/staticParams";
import Careers from "@/views/Careers";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export async function generateStaticParams() {
  return withStaticExportFallback((await getStaticCareerRoles()).map(({ slug }) => ({ slug })), { slug: "__empty__" });
}

async function getRole(params: Props["params"]) {
  const { slug } = await params;
  const role = (await getStaticCareerRoles()).find((job) => job.slug === slug);
  if (!role) notFound();
  return role;
}

export async function generateMetadata({ params }: Props) {
  const role = await getRole(params);
  return buildMetadata({ title: role.title + " | Milton Quran Institute", description: role.description, path: careerDetailPath(role.slug) });
}

export default async function Page({ params }: Props) {
  const [role, careersPageData] = await Promise.all([getRole(params), getCareersPage()]);
  return <Careers role={role} careersPageData={careersPageData} />;
}
