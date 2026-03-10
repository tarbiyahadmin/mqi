import { defineType, defineField } from 'sanity';

export const navLink = defineType({
  name: 'navLink',
  type: 'object',
  title: 'Nav Link',
  fields: [
    defineField({ name: 'label', type: 'string', title: 'Label', validation: (r) => r.required() }),
    defineField({ name: 'to', type: 'string', title: 'Path', validation: (r) => r.required() }),
  ],
});
