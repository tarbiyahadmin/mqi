import { defineType, defineField } from 'sanity';

export const contentBlockRichText = defineType({
  name: 'contentBlockRichText',
  type: 'object',
  title: 'Rich Text',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Section Heading',
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }: { heading?: string }) => ({
      title: heading || 'Rich Text',
      subtitle: 'Rich text block',
    }),
  },
});

export const contentBlockImage = defineType({
  name: 'contentBlockImage',
  type: 'object',
  title: 'Image',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
  ],
  preview: {
    select: { caption: 'caption' },
    prepare: ({ caption }: { caption?: string }) => ({
      title: caption || 'Image',
      subtitle: 'Image block',
    }),
  },
});

export const contentBlockCta = defineType({
  name: 'contentBlockCta',
  type: 'object',
  title: 'Call to Action',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subtitle', rows: 2 }),
    defineField({
      name: 'buttons',
      type: 'array',
      title: 'Buttons',
      of: [{ type: 'ctaButton' }],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }: { title?: string }) => ({
      title: title || 'Call to Action',
      subtitle: 'CTA block',
    }),
  },
});
