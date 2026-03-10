import { defineType, defineField } from 'sanity';
import { seoFields } from './seo';

export const blogPost = defineType({
  name: 'blogPost',
  type: 'document',
  title: 'Blog Post',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'slug', type: 'slug', title: 'Slug', validation: (r) => r.required(), options: { source: 'title' } }),
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'excerpt', type: 'text', title: 'Excerpt' }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At' }),
    defineField({ name: 'mainImage', type: 'image', title: 'Main Image', options: { hotspot: true } }),
    defineField({ name: 'category', type: 'string', title: 'Category' }),
    defineField({ name: 'author', type: 'string', title: 'Author' }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    ...seoFields,
  ],
});
