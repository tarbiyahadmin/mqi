import { defineType, defineField } from 'sanity';
import { seoFields } from './seo';
import { hadith } from './hadith';

export const donateTrustBullet = defineType({
  name: 'donateTrustBullet',
  type: 'object',
  title: 'Trust Bullet',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'desc', type: 'string', title: 'Description', validation: (r) => r.required() }),
  ],
});

export const donatePage = defineType({
  name: 'donatePage',
  type: 'document',
  title: 'Donate Page',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'cta', title: 'Call to Action' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Page Title', group: 'content', initialValue: 'Support Our Mission' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Page Subtitle', group: 'content' }),
    defineField({
      name: 'hadith',
      type: 'hadith',
      title: 'Hadith',
      group: 'content',
    }),
    defineField({
      name: 'trustBullets',
      type: 'array',
      title: 'Trust Section',
      group: 'content',
      of: [{ type: 'donateTrustBullet' }],
    }),
    defineField({
      name: 'howDonationHelps',
      type: 'array',
      title: 'How Your Donation Helps',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'list' },
    }),
    defineField({
      name: 'studentSponsorship',
      type: 'text',
      title: 'Student Sponsorship Section',
      group: 'content',
      rows: 6,
      description: 'Descriptive text for the Sponsor a Student section.',
    }),
    defineField({
      name: 'jotformDonateUrl',
      type: 'string',
      title: 'Make a Donation – Jotform URL',
      group: 'cta',
      description: 'Full URL or form ID. Button links to this (opens in new tab).',
    }),
    defineField({
      name: 'donateCtaLabel',
      type: 'string',
      title: 'Make a Donation – Button Label',
      group: 'cta',
      initialValue: 'Make a Donation',
    }),
    defineField({
      name: 'jotformSponsorStudentUrl',
      type: 'string',
      title: 'Sponsor a Student – Jotform URL',
      group: 'cta',
      description: 'Full URL or form ID. Button links to this (opens in new tab).',
    }),
    defineField({
      name: 'sponsorCtaLabel',
      type: 'string',
      title: 'Sponsor a Student – Button Label',
      group: 'cta',
      initialValue: 'Sponsor a Student',
    }),
    defineField({
      name: 'donateFormTitle',
      type: 'string',
      title: 'General Donations Section Title (legacy)',
      group: 'cta',
      initialValue: 'Make a Donation',
      hidden: true,
    }),
    defineField({
      name: 'sponsorFormTitle',
      type: 'string',
      title: 'Sponsor Section Title (legacy)',
      group: 'cta',
      initialValue: 'Sponsor a Student',
      hidden: true,
    }),
    defineField({
      name: 'additionalContent',
      type: 'array',
      title: 'Additional Content',
      group: 'content',
      of: [{ type: 'block' }],
      description: 'Optional rich text below the main sections.',
    }),
    ...seoFields,
  ],
});
