import { defineType, defineField } from 'sanity';
import { seoFields } from './seo';

export const thankYouPage = defineType({
  name: 'thankYouPage',
  type: 'document',
  title: 'Thank You Page',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'cta', title: 'Call to action' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Heading',
      group: 'content',
      initialValue: 'Thank you',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Subtitle',
      group: 'content',
      rows: 2,
      description: 'Short line under the heading.',
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      group: 'content',
      of: [{ type: 'block' }],
      description: 'Main message after a successful form submission.',
    }),
    defineField({
      name: 'primaryCtaLabel',
      type: 'string',
      title: 'Primary button label',
      group: 'cta',
      initialValue: 'Back to home',
    }),
    defineField({
      name: 'primaryCtaPath',
      type: 'string',
      title: 'Primary button link',
      group: 'cta',
      initialValue: '/',
      description: 'Internal path (e.g. /, /programs).',
    }),
    ...seoFields,
  ],
  preview: {
    prepare() {
      return { title: 'Thank You Page', subtitle: '/thank-you' };
    },
  },
});
