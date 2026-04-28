import { sanityClient } from './sanity';

// Reusable GROQ fragments
const imageProjection = `{ _type, asset->{ _id, url }, hotspot, crop }`;

// --- Types (aligned with Sanity schemas) ---
export interface NavLink {
  label: string;
  to: string;
  displayAsButton?: boolean;
  openInNewTab?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  navLinks?: NavLink[];
  footerTagline?: string;
  footerQuickLinks?: NavLink[];
  footerProgramLinks?: NavLink[];
  footerAddress?: string;
  footerPhone?: string;
  footerEmail?: string;
  socialLinks?: SocialLink[];
  footerCopyright?: string;
}

export interface HomeProgramCategory {
  title: string;
  description: string;
  to?: string;
  categorySlug?: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
}

export interface FormPageRef {
  slug?: string;
}

export interface CtaButton {
  label: string;
  to: string;
  isExternal?: boolean;
  variant?: 'primary' | 'accent';
  formPage?: FormPageRef | null;
}

export interface Hadith {
  arabic?: string;
  english?: string;
  reference?: string;
}

export interface Homepage {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaButtons?: CtaButton[];
  programsSectionTitle?: string;
  programsSectionSubtitle?: string;
  programCategories?: HomeProgramCategory[];
  featuredPrograms?: { _id: string; slug?: string; title?: string; category?: { slug?: string }; shortDescription?: string; mainImage?: unknown }[];
  viewAllProgramsLabel?: string;
  whyChooseUsSectionTitle?: string;
  whyChooseUsSectionSubtitle?: string;
  whyChooseUsItems?: WhyChooseUsItem[];
  testimonialsSectionTitle?: string;
  testimonials?: { quote?: string; name?: string; role?: string }[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtons?: CtaButton[];
  footerNote?: string;
  editorialPhotos?: { asset?: { url: string }; _type?: string }[];
}

export interface ProgramCategoryRef {
  slug: string;
  title: string;
  ages?: string;
  schedule?: string;
}

export interface ProgramCategory {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  programs?: ProgramCategoryRef[];
}

export interface ProgramFAQ {
  q?: string;
  a?: string;
}

export interface ProgramInfoCard {
  title: string;
  text: string;
}

export interface ScheduleBlockBase {
  _type: string;
  _key?: string;
  blockTitle?: string;
}

export interface ScheduleBlockProgramOptions extends ScheduleBlockBase {
  _type: 'scheduleBlockProgramOptions';
  richText?: unknown[];
  options?: { label: string; price?: string }[];
}

export interface ScheduleBlockSimpleSchedule extends ScheduleBlockBase {
  _type: 'scheduleBlockSimpleSchedule';
  days?: string;
  time?: string;
  additionalNote?: string;
}

export interface ScheduleBlockPricingTable extends ScheduleBlockBase {
  _type: 'scheduleBlockPricingTable';
  rows?: { description: string; price: string }[];
}

export interface ScheduleBlockSimplePricing extends ScheduleBlockBase {
  _type: 'scheduleBlockSimplePricing';
  items?: { label: string; price: string }[];
}

export interface ScheduleBlockTimeSlotGrid extends ScheduleBlockBase {
  _type: 'scheduleBlockTimeSlotGrid';
  slots?: { day?: string; time?: string; optionalLabel?: string }[];
}

export type ScheduleBlock =
  | ScheduleBlockProgramOptions
  | ScheduleBlockSimpleSchedule
  | ScheduleBlockPricingTable
  | ScheduleBlockSimplePricing
  | ScheduleBlockTimeSlotGrid;

export interface ProgramLocation {
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
}

export interface SpecialOffer {
  title: string;
  description?: string;
}

export interface FormPageDoc {
  _id: string;
  title: string;
  slug: string;
  intro?: unknown[];
  embedFormUrl?: string;
  seo?: SeoData;
}

export interface ThankYouPageDoc {
  title?: string;
  subtitle?: string;
  body?: unknown[];
  primaryCtaLabel?: string;
  primaryCtaPath?: string;
  seo?: SeoData;
}

export interface Program {
  _id: string;
  slug: string;
  title: string;
  heroText?: string;
  category?: { _id: string; title: string; slug?: string };
  mainImage?: { asset?: { url: string }; _type?: string };
  shortDescription?: string;
  overview?: string;
  infoCards?: ProgramInfoCard[];
  location?: ProgramLocation;
  scheduleBlocks?: ScheduleBlock[];
  curriculum?: string[];
  specialOffers?: SpecialOffer[];
  registrationFormPage?: FormPageRef | null;
  jotformUrl?: string;
   feeStructureCtaLabel?: string;
   feeStructureCtaUrl?: string;
  faqs?: ProgramFAQ[];
  seo?: SeoData;
}

export interface ProgramForListing extends Program {
  category?: { _id: string; title: string; slug: string };
}

export interface ProgramsPage {
  title?: string;
  subtitle?: string;
  introContent?: unknown[];
  seo?: SeoData;
}

export interface BlogPostListItem {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  mainImage?: { asset?: { url: string } };
}

export interface BlogPostFull extends BlogPostListItem {
  category?: string;
  author?: string;
  body?: unknown[];
  seo?: SeoData;
}

export interface BlogPage {
  title?: string;
  subtitle?: string;
  introContent?: unknown[];
  seo?: SeoData;
}

export interface CareerRole {
  _id: string;
  title: string;
  type: string;
  location?: string;
  description?: string;
  requirements?: string[];
  applicationFormPage?: FormPageRef | null;
  jotformLink?: string;
}

export interface CareersPage {
  title?: string;
  subtitle?: string;
  whyWorkAtMqi?: string;
  applyFormTitle?: string;
  introContent?: unknown[];
  seo?: SeoData;
}

export interface DonateTrustBullet {
  title?: string;
  desc?: string;
}

export interface DonatePage {
  title?: string;
  subtitle?: string;
  hadith?: Hadith;
  trustBullets?: DonateTrustBullet[];
  howDonationHelps?: string[];
  studentSponsorship?: string;
  donateFormPage?: FormPageRef | null;
  sponsorFormPage?: FormPageRef | null;
  jotformDonateUrl?: string;
  donateCtaLabel?: string;
  jotformSponsorStudentUrl?: string;
  sponsorCtaLabel?: string;
  donateFormTitle?: string;
  sponsorFormTitle?: string;
  additionalContent?: unknown[];
  seo?: SeoData;
}

export interface AboutTeacher {
  name: string;
  role?: string;
  oneLineDescription?: string;
  photo?: { asset?: { url: string } };
}

export interface AboutGraduate {
  name: string;
  title?: string;
  yearOfGraduation?: string;
  photo?: { asset?: { url: string } };
}

export interface AboutPage {
  title?: string;
  subtitle?: string;
  ourStory?: string;
  ourMission?: string;
  ourVision?: string;
  ourValues?: { title: string; description?: string }[];
  ourApproach?: string;
  instituteText?: string;
  teachers?: AboutTeacher[];
  graduates?: AboutGraduate[];
  additionalContent?: unknown[];
  seo?: SeoData;
}

export interface ContentBlockRichText {
  _type: 'contentBlockRichText';
  _key?: string;
  heading?: string;
  body?: unknown[];
}

export interface ContentBlockImage {
  _type: 'contentBlockImage';
  _key?: string;
  image?: { asset?: { url: string } };
  caption?: string;
}

export interface ContentBlockCta {
  _type: 'contentBlockCta';
  _key?: string;
  title?: string;
  subtitle?: string;
  buttons?: CtaButton[];
}

export type TemplateSection = ContentBlockRichText | ContentBlockImage | ContentBlockCta;

export interface SeoData {
  seoTitle?: string | null;
  metaDescription?: string | null;
}

export interface ContentPageDoc {
  _type: 'contentPage';
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  heroImage?: { asset?: { url: string } };
  mainContent?: unknown[];
  sections?: TemplateSection[];
  seo?: SeoData;
}

export interface LandingPageDoc {
  _type: 'landingPage';
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  heroImage?: { asset?: { url: string } };
  heroCtaButtons?: CtaButton[];
  body?: unknown[];
  sections?: TemplateSection[];
  seo?: SeoData;
}

export interface InfoPageDoc {
  _type: 'infoPage';
  _id: string;
  slug: string;
  title: string;
  subtitle?: string;
  introText?: string;
  sections?: TemplateSection[];
  seo?: SeoData;
}

export type TemplatePageDoc = ContentPageDoc | LandingPageDoc | InfoPageDoc;

// --- GROQ Queries ---
const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  navLinks[]{ label, to, displayAsButton, openInNewTab },
  footerTagline,
  footerQuickLinks[]{ label, to, displayAsButton, openInNewTab },
  footerProgramLinks[]{ label, to, displayAsButton, openInNewTab },
  footerAddress,
  footerPhone,
  footerEmail,
  socialLinks[]{ platform, url },
  footerCopyright
}`;

const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  heroCtaButtons[]{ label, to, isExternal, variant, formPage->{ "slug": slug.current } },
  programsSectionTitle,
  programsSectionSubtitle,
  "featuredPrograms": featuredPrograms[]->{
    _id,
    "slug": slug.current,
    title,
    shortDescription,
    mainImage ${imageProjection},
    "category": category->{ _id, title, "slug": slug.current }
  },
  viewAllProgramsLabel,
  editorialPhotos[] ${imageProjection},
  whyChooseUsSectionTitle,
  whyChooseUsSectionSubtitle,
  whyChooseUsItems[]{ title, description },
  testimonialsSectionTitle,
  testimonials[]{ quote, name, role },
  ctaTitle,
  ctaSubtitle,
  ctaButtons[]{ label, to, isExternal, variant, formPage->{ "slug": slug.current } },
  footerNote,
  seo{ seoTitle, metaDescription }
}`;

const PROGRAMS_PAGE_QUERY = `*[_type == "programsPage"][0]{ title, subtitle, introContent, seo{ seoTitle, metaDescription } }`;

const PROGRAM_CATEGORIES_QUERY = `*[_type == "programCategory"] | order(title asc){
  _id,
  "slug": slug.current,
  title,
  description,
  programs[]{ slug, title, ages, schedule }
}`;

const PROGRAMS_FOR_LISTING_QUERY = `*[_type == "program"] | order(category->title asc, title asc){
  _id,
  "slug": slug.current,
  title,
  shortDescription,
  mainImage ${imageProjection},
  "category": category->{ _id, title, "slug": slug.current }
}`;

const PROGRAM_BY_SLUG_QUERY = `*[_type == "program" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  heroText,
  category->{ _id, title, "slug": slug.current },
  mainImage ${imageProjection},
  shortDescription,
  overview,
  infoCards[]{ title, text },
  location{ address, city, province, postalCode },
  scheduleBlocks[]{
    _type,
    _key,
    blockTitle,
    richText,
    options[]{ label, price },
    days,
    time,
    additionalNote,
    rows[]{ description, price },
    items[]{ label, price },
    slots[]{ day, time, optionalLabel }
  },
  curriculum,
  specialOffers[]{ title, description },
  registrationFormPage->{ "slug": slug.current },
  jotformUrl,
  feeStructureCtaLabel,
  feeStructureCtaUrl,
  faqs[]{ q, a },
  seo{ seoTitle, metaDescription }
}`;

const BLOG_PAGE_QUERY = `*[_type == "blogPage"][0]{ title, subtitle, introContent, seo{ seoTitle, metaDescription } }`;

const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc){
  _id,
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  mainImage ${imageProjection}
}`;

const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  mainImage ${imageProjection},
  category,
  author,
  body,
  seo{ seoTitle, metaDescription }
}`;

const CAREERS_PAGE_QUERY = `*[_type == "careersPage"][0]{
  title,
  subtitle,
  whyWorkAtMqi,
  applyFormTitle,
  introContent,
  seo{ seoTitle, metaDescription }
}`;

const CAREER_ROLES_QUERY = `*[_type == "careerRole"] | order(title asc){
  _id,
  title,
  type,
  location,
  description,
  requirements,
  applicationFormPage->{ "slug": slug.current },
  jotformLink
}`;

const DONATE_PAGE_QUERY = `*[_type == "donatePage"][0]{
  title,
  subtitle,
  hadith{ arabic, english, reference },
  trustBullets[]{ title, desc },
  howDonationHelps,
  studentSponsorship,
  donateFormPage->{ "slug": slug.current },
  sponsorFormPage->{ "slug": slug.current },
  jotformDonateUrl,
  donateCtaLabel,
  jotformSponsorStudentUrl,
  sponsorCtaLabel,
  donateFormTitle,
  sponsorFormTitle,
  additionalContent,
  seo{ seoTitle, metaDescription }
}`;

const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  title,
  subtitle,
  ourStory,
  ourMission,
  ourVision,
  ourValues[]{ title, description },
  ourApproach,
  instituteText,
  teachers[]{
    name,
    role,
    oneLineDescription,
    photo ${imageProjection}
  },
  graduates[]{
    name,
    title,
    yearOfGraduation,
    photo ${imageProjection}
  },
  additionalContent,
  seo{ seoTitle, metaDescription }
}`;

const FORM_PAGE_BY_SLUG_QUERY = `*[_type == "formPage" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  intro,
  embedFormUrl,
  seo{ seoTitle, metaDescription }
}`;

const THANK_YOU_PAGE_QUERY = `*[_type == "thankYouPage"] | order(_updatedAt desc)[0]{
  title,
  subtitle,
  body,
  primaryCtaLabel,
  primaryCtaPath,
  seo{ seoTitle, metaDescription }
}`;

const TEMPLATE_PAGE_QUERY = `*[_type in ["contentPage", "landingPage", "infoPage"] && slug.current == $slug][0]{
  _type,
  _id,
  "slug": slug.current,
  title,
  subtitle,
  heroImage ${imageProjection},
  heroCtaButtons[]{ label, to, variant, isExternal, formPage->{ "slug": slug.current } },
  mainContent,
  body,
  introText,
  sections[]{
    _type,
    _key,
    heading,
    body,
    image ${imageProjection},
    caption,
    title,
    subtitle,
    buttons[]{ label, to, variant, isExternal, formPage->{ "slug": slug.current } }
  },
  seo{ seoTitle, metaDescription }
}`;

// --- Fetch functions ---
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
}

export async function getHomepage(): Promise<Homepage | null> {
  return sanityClient.fetch<Homepage | null>(HOMEPAGE_QUERY);
}

export async function getProgramsPage(): Promise<ProgramsPage | null> {
  return sanityClient.fetch<ProgramsPage | null>(PROGRAMS_PAGE_QUERY);
}

export async function getProgramCategories(): Promise<ProgramCategory[]> {
  return sanityClient.fetch<ProgramCategory[]>(PROGRAM_CATEGORIES_QUERY);
}

export async function getProgramsForListing(): Promise<ProgramForListing[]> {
  return sanityClient.fetch<ProgramForListing[]>(PROGRAMS_FOR_LISTING_QUERY);
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  return sanityClient.fetch<Program | null>(PROGRAM_BY_SLUG_QUERY, { slug });
}

export async function getBlogPage(): Promise<BlogPage | null> {
  return sanityClient.fetch<BlogPage | null>(BLOG_PAGE_QUERY);
}

export async function getBlogPosts(): Promise<BlogPostListItem[]> {
  return sanityClient.fetch<BlogPostListItem[]>(BLOG_POSTS_QUERY);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostFull | null> {
  return sanityClient.fetch<BlogPostFull | null>(BLOG_POST_BY_SLUG_QUERY, { slug });
}

export async function getCareersPage(): Promise<CareersPage | null> {
  return sanityClient.fetch<CareersPage | null>(CAREERS_PAGE_QUERY);
}

export async function getCareerRoles(): Promise<CareerRole[]> {
  return sanityClient.fetch<CareerRole[]>(CAREER_ROLES_QUERY);
}

export async function getDonatePage(): Promise<DonatePage | null> {
  return sanityClient.fetch<DonatePage | null>(DONATE_PAGE_QUERY);
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return sanityClient.fetch<AboutPage | null>(ABOUT_PAGE_QUERY);
}

export async function getTemplatePageBySlug(slug: string): Promise<TemplatePageDoc | null> {
  return sanityClient.fetch<TemplatePageDoc | null>(TEMPLATE_PAGE_QUERY, { slug });
}

export async function getFormPageBySlug(slug: string): Promise<FormPageDoc | null> {
  return sanityClient.fetch<FormPageDoc | null>(FORM_PAGE_BY_SLUG_QUERY, { slug });
}

export async function getThankYouPage(): Promise<ThankYouPageDoc | null> {
  return sanityClient.fetch<ThankYouPageDoc | null>(THANK_YOU_PAGE_QUERY);
}
