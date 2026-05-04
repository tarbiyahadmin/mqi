import { defineType, defineField } from 'sanity';
import { seoFields } from './seo';

export const formPage = defineType({
  name: 'formPage',
  type: 'document',
  title: 'Form Page',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'form', title: 'Embedded form' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      group: 'content',
      validation: (r) => r.required(),
      description: 'Shown above the form (e.g. "Register for Weekend Hifz").',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      group: 'content',
      options: { source: 'title' },
      validation: (r) => r.required(),
      description: 'Public URL: /forms/[slug]. Use lowercase letters, numbers, and hyphens.',
    }),
    defineField({
      name: 'intro',
      type: 'array',
      title: 'Intro (optional)',
      group: 'content',
      of: [{ type: 'block' }],
      description: 'Optional rich text above the embedded form.',
    }),
    defineField({
      name: 'embedFormUrl',
      type: 'string',
      title: 'Embedded form URL',
      group: 'form',
      validation: (r) => r.required().min(1),
      description:
        'Full Jotform URL (https://form.jotform.com/…) or form ID only. In Jotform settings, set the thank-you redirect to this site’s /thank-you page.',
    }),
    ...seoFields,
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare({ title, slug }: { title?: string; slug?: string }) {
      return { title: title || 'Form page', subtitle: slug ? `/forms/${slug}` : undefined };
    },
  },
});
