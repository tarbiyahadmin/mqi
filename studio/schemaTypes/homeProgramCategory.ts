import { defineType, defineField } from 'sanity';

export const homeProgramCategory = defineType({
  name: 'homeProgramCategory',
  type: 'object',
  title: 'Home Program Category',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description', validation: (r) => r.required() }),
    defineField({ name: 'to', type: 'string', title: 'Link (path)', initialValue: '/programs' }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Card image',
      options: { hotspot: true },
      description: 'Optional. Falls back to institute photography when empty.',
    }),
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
      name: 'formPage',
      type: 'reference',
      title: 'Form page',
      to: [{ type: 'formPage' }],
      description: 'Buttons route to internal form pages only (/forms/…).',
      validation: (r) => r.required(),
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
