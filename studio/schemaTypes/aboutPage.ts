import { defineType, defineField } from 'sanity';
import { seoFields } from './seo';

export const aboutTeacher = defineType({
  name: 'aboutTeacher',
  type: 'object',
  title: 'Teacher',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role',
      description: 'e.g. Head Instructor, Tajweed Teacher',
    }),
    defineField({
      name: 'oneLineDescription',
      type: 'string',
      title: 'One-line description',
      description: 'Short description shown under the teacher name.',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
    }),
  ],
});

export const aboutGraduate = defineType({
  name: 'aboutGraduate',
  type: 'object',
  title: 'Graduate',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'e.g. Hafiz, Alumni, Community Leader',
    }),
    defineField({
      name: 'yearOfGraduation',
      type: 'string',
      title: 'Year of Graduation',
      description: 'e.g. 2024',
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
    }),
  ],
});

export const aboutPage = defineType({
  name: 'aboutPage',
  type: 'document',
  title: 'About Page',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      group: 'content',
      initialValue: 'About Us',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      title: 'Page Subtitle',
      group: 'content',
      rows: 3,
      description: 'Short introductory text shown under the About Us heading.',
    }),
    defineField({
      name: 'ourStory',
      type: 'text',
      title: 'Our Story',
      group: 'content',
      rows: 6,
    }),
    defineField({
      name: 'ourMission',
      type: 'text',
      title: 'Our Mission',
      group: 'content',
      rows: 4,
    }),
    defineField({
      name: 'ourVision',
      type: 'text',
      title: 'Our Vision',
      group: 'content',
      rows: 4,
    }),
    defineField({
      name: 'ourValues',
      type: 'array',
      title: 'Our Values',
      group: 'content',
      description: 'Values as cards with title, description, and optional icon.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
            defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
            defineField({
              name: 'icon',
              type: 'string',
              title: 'Icon',
              options: {
                list: ['Heart', 'BookOpen', 'Users', 'Award', 'Shield', 'Globe', 'Target', 'Sparkles'],
              },
            }),
          ],
          preview: { select: { title: 'title' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Value' }) },
        },
      ],
    }),
    defineField({
      name: 'ourApproach',
      type: 'text',
      title: 'Our Approach',
      group: 'content',
      rows: 6,
      description: 'How we approach education and community.',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero / Supporting Image',
      group: 'content',
      options: { hotspot: true },
      description: 'Shown on the About page and homepage About section.',
    }),
    defineField({
      name: 'instituteText',
      type: 'text',
      title: 'Institute Text (Homepage summary)',
      group: 'content',
      rows: 4,
      description: 'Short text shown in the homepage About section. Falls back to Our Story if empty.',
    }),
    defineField({
      name: 'teachers',
      type: 'array',
      title: 'Teachers',
      group: 'content',
      of: [{ type: 'aboutTeacher' }],
    }),
    defineField({
      name: 'graduates',
      type: 'array',
      title: 'Graduates',
      group: 'content',
      of: [{ type: 'aboutGraduate' }],
    }),
    defineField({
      name: 'additionalContent',
      type: 'array',
      title: 'Additional Content',
      group: 'content',
      of: [{ type: 'block' }],
      description: 'Optional rich text section at the bottom of the page.',
    }),
    ...seoFields,
  ],
});

