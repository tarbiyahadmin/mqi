import { defineType, defineField } from 'sanity';
import { seoFields } from './seo';

export const careerRole = defineType({
  name: 'careerRole',
  type: 'document',
  title: 'Career / Volunteer Role',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: { list: ['Teaching', 'Admin', 'Volunteer'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({ name: 'description', type: 'text', title: 'Description', validation: (r) => r.required() }),
    defineField({
      name: 'requirements',
      type: 'array',
      title: 'Requirements',
      of: [{ type: 'string' }],
      options: { layout: 'list' },
    }),
    defineField({
      name: 'applicationFormPage',
      type: 'reference',
      title: 'Application form page',
      to: [{ type: 'formPage' }],
      description: 'Dedicated on-site application form (/forms/…). Preferred over a raw Jotform link.',
    }),
    defineField({
      name: 'jotformLink',
      type: 'string',
      title: 'Jotform link (legacy)',
      description: 'Used only if no application form page is set. Full URL or form ID.',
    }),
  ],
});

export const careersPage = defineType({
  name: 'careersPage',
  type: 'document',
  title: 'Careers Page',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Page Title', group: 'content', initialValue: 'Career & Volunteer Opportunities' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Page Subtitle', group: 'content' }),
    defineField({
      name: 'whyWorkAtMqi',
      type: 'text',
      title: 'Why Work at MQI?',
      group: 'content',
      rows: 8,
      description: 'Content for the "Why Work at MQI?" section.',
    }),
    defineField({
      name: 'applyFormTitle',
      type: 'string',
      title: 'Apply Form Section Title',
      group: 'content',
      initialValue: 'Apply for this Position',
    }),
    defineField({
      name: 'introContent',
      type: 'array',
      title: 'Intro / Additional Content',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    ...seoFields,
  ],
});
