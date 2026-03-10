import { defineType, defineField } from 'sanity';

const programInfoIconOptions = [
  'Users',
  'DollarSign',
  'Clock',
  'Calendar',
  'MapPin',
  'BookOpen',
  'GraduationCap',
  'Heart',
  'Award',
];

export const programInfoCard = defineType({
  name: 'programInfoCard',
  type: 'object',
  title: 'Program Info Card',
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon',
      options: { list: programInfoIconOptions },
      initialValue: 'BookOpen',
    }),
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
