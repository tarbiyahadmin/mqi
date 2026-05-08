import { defineType, defineField } from 'sanity';
import { seoFields } from './seo';

export const financialAidStep = defineType({
  name: 'financialAidStep',
  type: 'object',
  title: 'Step',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }: { title?: string }) => ({ title: title || 'Step' }),
  },
});

export const financialAidPage = defineType({
  name: 'financialAidPage',
  type: 'document',
  title: 'Financial Aid Page',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'sections', title: 'Sections' },
    { name: 'quote', title: 'Quote' },
    { name: 'closing', title: 'Closing CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page title',
      group: 'general',
      initialValue: 'Financial Aid',
      validation: (r) => r.required(),
      description: 'Used for SEO and an accessible page heading (visually subtle).',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      group: 'general',
      description: 'Used for reference in the CMS. The live URL is fixed at /financial-aid.',
      options: { source: 'title', maxLength: 96 },
      initialValue: { current: 'financial-aid' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'scholarshipOverviewTitle',
      type: 'string',
      title: 'Scholarship overview — title',
      group: 'sections',
    }),
    defineField({
      name: 'scholarshipOverviewBody',
      type: 'text',
      title: 'Scholarship overview — body',
      group: 'sections',
      rows: 8,
    }),
    defineField({
      name: 'scholarshipOverviewImage',
      type: 'image',
      title: 'Scholarship overview — image',
      group: 'sections',
      options: { hotspot: true },
    }),
    defineField({
      name: 'howItWorksTitle',
      type: 'string',
      title: 'How it works — title',
      group: 'sections',
    }),
    defineField({
      name: 'howItWorksSteps',
      type: 'array',
      title: 'How it works — steps',
      group: 'sections',
      of: [{ type: 'financialAidStep' }],
    }),
    defineField({
      name: 'howItWorksImage',
      type: 'image',
      title: 'How it works — image',
      group: 'sections',
      options: { hotspot: true },
    }),
    defineField({
      name: 'meritNeedTitle',
      type: 'string',
      title: 'Merit & need — title',
      group: 'sections',
    }),
    defineField({
      name: 'meritNeedIntro',
      type: 'text',
      title: 'Merit & need — introduction',
      group: 'sections',
      rows: 5,
    }),
    defineField({
      name: 'meritNeedBullets',
      type: 'array',
      title: 'Merit & need — bullet points',
      group: 'sections',
      of: [{ type: 'string' }],
      options: { layout: 'list' },
    }),
    defineField({
      name: 'meritNeedImage',
      type: 'image',
      title: 'Merit & need — image',
      group: 'sections',
      options: { hotspot: true },
    }),
    defineField({
      name: 'meritNeedCta',
      type: 'ctaButton',
      title: 'Merit & need — button',
      group: 'sections',
      description: 'Optional button shown under this section, linking to an internal form page.',
    }),
    defineField({
      name: 'quoteEyebrow',
      type: 'string',
      title: 'Quote section label',
      group: 'quote',
      description: 'e.g. Sadaqah Jariyah',
    }),
    defineField({
      name: 'quote',
      type: 'hadith',
      title: 'Hadith / quote',
      group: 'quote',
    }),
    defineField({
      name: 'closingCtaTitle',
      type: 'string',
      title: 'Closing CTA title',
      group: 'closing',
    }),
    defineField({
      name: 'closingCtaSubtitle',
      type: 'text',
      title: 'Closing CTA subtitle',
      group: 'closing',
      rows: 4,
    }),
    defineField({
      name: 'closingCtaImage',
      type: 'image',
      title: 'Closing CTA background image',
      group: 'closing',
      options: { hotspot: true },
    }),
    defineField({
      name: 'closingApplyCta',
      type: 'ctaButton',
      title: 'Apply button',
      group: 'closing'
    }),
    defineField({
      name: 'closingDonateCta',
      type: 'ctaButton',
      title: 'Donate button',
      group: 'closing'
    }),
    defineField({
      name: 'additionalContent',
      type: 'array',
      title: 'Additional content',
      group: 'general',
      of: [{ type: 'block' }],
      description: 'Optional rich text after the main sections (before the closing CTA).',
    }),
    ...seoFields,
  ],
});
