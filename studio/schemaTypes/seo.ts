import { defineType, defineField } from 'sanity';

export const seo = defineType({
  name: 'seo',
  type: 'object',
  title: 'SEO',
  fields: [
    defineField({
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Title',
      description: 'Title for search engines and social sharing. Defaults to page title if empty.',
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      rows: 2,
      description: 'Brief description for search results. 150–160 characters recommended.',
    }),
  ],
});

export const seoFields = [
  defineField({
    name: 'seo',
    type: 'seo',
    title: 'SEO',
    group: 'seo',
  }),
];
