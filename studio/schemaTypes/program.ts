import { defineType, defineField } from 'sanity';
import { seoFields } from './seo';
import { programInfoCard } from './programInfoCard';

export const program = defineType({
  name: 'program',
  type: 'document',
  title: 'Program',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'registration', title: 'Registration' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'slug', type: 'slug', title: 'Slug', group: 'content', validation: (r) => r.required(), options: { source: 'title' } }),
    defineField({ name: 'title', type: 'string', title: 'Title', group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'heroText',
      type: 'text',
      title: 'Hero Text',
      group: 'content',
      rows: 2,
      description: 'Short text displayed beneath the program name on the program detail page.',
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Category',
      group: 'content',
      to: [{ type: 'programCategory' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      group: 'content',
      description: 'Used on program cards and detail page.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description (for cards)',
      group: 'content',
      description: 'Brief summary shown on the Programs listing page.',
      rows: 2,
    }),
    defineField({ name: 'overview', type: 'text', title: 'Overview', group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'infoCards',
      type: 'array',
      title: 'Program Information Cards',
      group: 'content',
      description: 'Flexible cards (Audience, Fees, etc.). Add unlimited cards with title and text.',
      of: [{ type: 'programInfoCard' }],
    }),
    defineField({
      name: 'location',
      type: 'object',
      title: 'Location',
      group: 'content',
      description: 'Address-based location display (no map).',
      fields: [
        defineField({ name: 'address', type: 'text', title: 'Address', rows: 2 }),
        defineField({ name: 'city', type: 'string', title: 'City' }),
        defineField({ name: 'province', type: 'string', title: 'Province' }),
        defineField({ name: 'postalCode', type: 'string', title: 'Postal Code' }),
      ],
    }),
    defineField({
      name: 'scheduleBlocks',
      type: 'array',
      title: 'Schedule',
      group: 'content',
      description: 'Flexible schedule blocks. Build different layouts: Program Options, Simple Schedule, Pricing Table, Time Slot Grid, etc. Order determines display order. Shown below Curriculum.',
      of: [
        { type: 'scheduleBlockProgramOptions' },
        { type: 'scheduleBlockSimpleSchedule' },
        { type: 'scheduleBlockPricingTable' },
        { type: 'scheduleBlockSimplePricing' },
        { type: 'scheduleBlockTimeSlotGrid' },
      ],
    }),
    defineField({
      name: 'curriculum',
      type: 'array',
      title: 'Curriculum',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'list' },
      description: 'Bullet list of curriculum items.',
    }),
    defineField({
      name: 'specialOffers',
      type: 'array',
      title: 'Special Offers',
      group: 'content',
      description: 'Promotions such as discounts or referral bonuses.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
            defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
          ],
          preview: { select: { title: 'title' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Offer' }) },
        },
      ],
    }),
    defineField({
      name: 'registrationFormPage',
      type: 'reference',
      title: 'Registration form page',
      group: 'registration',
      to: [{ type: 'formPage' }],
      description: 'Dedicated on-site form page (/forms/…). Preferred over linking directly to Jotform.',
    }),
    defineField({
      name: 'jotformUrl',
      type: 'string',
      title: 'Registration Jotform URL (legacy)',
      group: 'registration',
      description: 'Used only if no registration form page is set. Full URL or form ID; opens in a new tab.',
    }),
    defineField({
      name: 'feeStructureCtaLabel',
      type: 'string',
      title: 'Fee Structure CTA Label',
      group: 'registration',
      description: 'Optional label for the fee structure request button. Defaults to "Request Fee Structure".',
    }),
    defineField({
      name: 'feeStructureCtaUrl',
      type: 'string',
      title: 'Fee Structure CTA URL',
      group: 'registration',
      description: 'Optional URL (or mailto:) used when requesting the fee structure. Button is hidden if this is empty.',
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'FAQs',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'q', type: 'string', title: 'Question' }),
            defineField({ name: 'a', type: 'text', title: 'Answer' }),
          ],
          preview: { select: { title: 'q' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'FAQ' }) },
        },
      ],
    }),
    ...seoFields,
  ],
});

export const programCategory = defineType({
  name: 'programCategory',
  type: 'document',
  title: 'Program Category',
  fields: [
    defineField({ name: 'slug', type: 'slug', title: 'Slug', validation: (r) => r.required(), options: { source: 'title' } }),
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({
      name: 'programs',
      type: 'array',
      title: 'Programs',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'slug', type: 'string', title: 'Program slug (match program document)', validation: (r) => r.required() }),
            defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
            defineField({ name: 'ages', type: 'string', title: 'Ages' }),
            defineField({ name: 'schedule', type: 'string', title: 'Schedule' }),
          ],
          preview: { select: { title: 'title' }, prepare: ({ title }: { title?: string }) => ({ title: title || 'Program' }) },
        },
      ],
    }),
  ],
});
