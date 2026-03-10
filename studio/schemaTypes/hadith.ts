import { defineType, defineField } from 'sanity';

export const hadith = defineType({
  name: 'hadith',
  type: 'object',
  title: 'Hadith',
  fields: [
    defineField({
      name: 'arabic',
      type: 'text',
      title: 'Arabic Text',
      description: 'Hadith text in Arabic.',
    }),
    defineField({
      name: 'english',
      type: 'text',
      title: 'English Translation',
      rows: 3,
    }),
    defineField({
      name: 'reference',
      type: 'string',
      title: 'Reference',
      description: 'e.g. Sahih al-Bukhari 1',
    }),
  ],
});
