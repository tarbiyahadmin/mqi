import { defineType, defineField } from 'sanity';

export const pageCtaButton = defineType({
  name: 'pageCtaButton',
  type: 'object',
  title: 'Page CTA Button',
  fields: [
    defineField({ name: 'label', type: 'string', title: 'Label', validation: (r) => r.required() }),
    defineField({
      name: 'to',
      type: 'string',
      title: 'Internal page path',
      description: 'Internal route (e.g. /programs, /book-a-meet, /donate). Use a full URL only for external links.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Variant',
      options: { list: ['primary', 'accent'] },
      initialValue: 'primary',
    }),
    defineField({
      name: 'openInNewTab',
      type: 'boolean',
      title: 'Open in new tab',
      initialValue: false,
    }),
  ],
  preview: {
    select: { label: 'label', to: 'to' },
    prepare: ({ label, to }: { label?: string; to?: string }) => ({
      title: label || 'Page CTA',
      subtitle: to || undefined,
    }),
  },
});
