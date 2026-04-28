import { defineType, defineField } from 'sanity';

export const programInfoCard = defineType({
  name: 'programInfoCard',
  type: 'object',
  title: 'Program Info Card',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'text',
      type: 'text',
      title: 'Text',
      validation: (r) => r.required(),
    }),
  ],
});
