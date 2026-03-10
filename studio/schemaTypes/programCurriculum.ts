import { defineType, defineField } from 'sanity';

export const curriculumSubsection = defineType({
  name: 'curriculumSubsection',
  type: 'object',
  title: 'Curriculum Subsection',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Subsection Title',
      description: 'e.g. Ontario Curriculum, Islamic Curriculum',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }],
    }),
  ],
});
