import { defineType, defineField } from 'sanity';
import { seoFields } from './seo';

export const blogPage = defineType({
  name: 'blogPage',
  type: 'document',
  title: 'Blog Page',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Page Title', group: 'content', initialValue: 'Blog' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Page Subtitle', group: 'content', rows: 3 }),
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
