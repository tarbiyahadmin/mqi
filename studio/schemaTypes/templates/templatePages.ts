import { defineType, defineField } from 'sanity';
import { seoFields } from '../seo';

const sectionBlocks = [
  { type: 'contentBlockRichText' },
  { type: 'contentBlockImage' },
  { type: 'contentBlockCta' },
];

export const contentPage = defineType({
  name: 'contentPage',
  type: 'document',
  title: 'Content Page',
  description: 'Generic content page with title, optional hero image, and flexible sections.',
  groups: [{ name: 'content', title: 'Content', default: true }, { name: 'seo', title: 'SEO' }],
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title', type: 'string', title: 'Page Title', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subtitle', rows: 2 }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero / Header Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mainContent',
      type: 'array',
      title: 'Main Content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Additional Sections',
      of: sectionBlocks,
    }),
    ...seoFields,
  ],
});

export const landingPage = defineType({
  name: 'landingPage',
  type: 'document',
  title: 'Landing Page',
  description: 'Landing-style page with hero emphasis and CTA.',
  groups: [{ name: 'content', title: 'Content', default: true }, { name: 'seo', title: 'SEO' }],
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title', type: 'string', title: 'Page Title', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subtitle', rows: 3 }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroCtaButtons',
      type: 'array',
      title: 'Hero CTA Buttons',
      of: [{ type: 'ctaButton' }],
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body Content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: sectionBlocks,
    }),
    ...seoFields,
  ],
});

export const infoPage = defineType({
  name: 'infoPage',
  type: 'document',
  title: 'Info Page',
  description: 'Simple info page with optional intro and flexible content blocks.',
  groups: [{ name: 'content', title: 'Content', default: true }, { name: 'seo', title: 'SEO' }],
  fields: [
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title', type: 'string', title: 'Page Title', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subtitle', rows: 3 }),
    defineField({
      name: 'introText',
      type: 'text',
      title: 'Intro Text',
      rows: 4,
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Content Sections',
      of: sectionBlocks,
    }),
    ...seoFields,
  ],
});
