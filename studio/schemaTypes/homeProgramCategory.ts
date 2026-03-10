import { defineType, defineField } from 'sanity';

const iconOptions = [
  'BookOpen',
  'GraduationCap',
  'Sun',
  'Users',
  'Award',
  'Heart',
  'Clock',
  'Shield',
  'Briefcase',
];

export const homeProgramCategory = defineType({
  name: 'homeProgramCategory',
  type: 'object',
  title: 'Home Program Category',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description', validation: (r) => r.required() }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon',
      options: { list: iconOptions },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'to', type: 'string', title: 'Link (path)', initialValue: '/programs' }),
    defineField({
      name: 'programCategory',
      type: 'reference',
      title: 'Program Category',
      to: [{ type: 'programCategory' }],
      description: 'Link to a program category. When set, routes to filtered Programs view. Overrides Link path when both exist.',
    }),
  ],
});

export const whyChooseUsItem = defineType({
  name: 'whyChooseUsItem',
  type: 'object',
  title: 'Why Choose Us Item',
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon',
      options: { list: iconOptions },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'string', title: 'Description', validation: (r) => r.required() }),
  ],
});

export const ctaButton = defineType({
  name: 'ctaButton',
  type: 'object',
  title: 'CTA Button',
  fields: [
    defineField({ name: 'label', type: 'string', title: 'Label', validation: (r) => r.required() }),
    defineField({
      name: 'to',
      type: 'string',
      title: 'Destination',
      description: 'Internal path (e.g. /programs) or full URL (e.g. https://form.jotform.com/123). External URLs open in new tab.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'isExternal',
      type: 'boolean',
      title: 'Open in new tab',
      description: 'When enabled, opens link in a new tab (use for external URLs like Jotform).',
      initialValue: false,
    }),
    defineField({
      name: 'variant',
      type: 'string',
      title: 'Variant',
      options: { list: ['primary', 'accent'] },
      initialValue: 'primary',
    }),
  ],
});
