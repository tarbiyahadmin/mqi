import { defineType, defineField } from 'sanity';

export const navLink = defineType({
  name: 'navLink',
  type: 'object',
  title: 'Nav Link',
  fields: [
    defineField({ name: 'label', type: 'string', title: 'Label', validation: (r) => r.required() }),
    defineField({
      name: 'to',
      type: 'string',
      title: 'Path or URL',
      description: 'Internal path (e.g. /about) or full URL for external links.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'displayAsButton',
      type: 'boolean',
      title: 'Display as button',
      description: 'Shows as a button in the header; a compact pill in footer link lists.',
      initialValue: false,
    }),
    defineField({
      name: 'openInNewTab',
      type: 'boolean',
      title: 'Open in new tab',
      initialValue: false,
    }),
  ],
});
