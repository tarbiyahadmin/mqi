import { defineType, defineField } from 'sanity';

// Program Options: label + optional price (e.g. Saturdays 9AM, $250)
export const scheduleBlockProgramOptions = defineType({
  name: 'scheduleBlockProgramOptions',
  type: 'object',
  title: 'Program Options',
  preview: {
    select: { title: 'blockTitle' },
    prepare: ({ title }: { title?: string }) => ({ title: title || 'Program Options' }),
  },
  fields: [
    defineField({ name: 'blockTitle', type: 'string', title: 'Block Title', initialValue: 'Program Options' }),
    defineField({
      name: 'richText',
      type: 'array',
      title: 'Additional Content (Rich Text)',
      of: [{ type: 'block' }],
      description: 'Optional rich text content displayed above or alongside the options.',
    }),
    defineField({
      name: 'options',
      type: 'array',
      title: 'Options',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label', validation: (r) => r.required() }),
            defineField({ name: 'price', type: 'string', title: 'Price (optional)' }),
          ],
          preview: { select: { label: 'label' }, prepare: ({ label }: { label?: string }) => ({ title: label || 'Option' }) },
        },
      ],
    }),
  ],
});

// Simple Schedule: days + time
export const scheduleBlockSimpleSchedule = defineType({
  name: 'scheduleBlockSimpleSchedule',
  type: 'object',
  title: 'Simple Schedule (Days + Time)',
  preview: {
    select: { title: 'blockTitle' },
    prepare: ({ title }: { title?: string }) => ({ title: title || 'Schedule' }),
  },
  fields: [
    defineField({ name: 'blockTitle', type: 'string', title: 'Block Title', initialValue: 'Schedule' }),
    defineField({ name: 'days', type: 'string', title: 'Days', description: 'e.g. Saturdays & Sundays, Mon–Fri' }),
    defineField({ name: 'time', type: 'string', title: 'Time', description: 'e.g. 9:00 AM – 12:00 PM' }),
    defineField({ name: 'additionalNote', type: 'text', title: 'Additional Note', rows: 2 }),
  ],
});

// Pricing Table: rows with description and price
export const scheduleBlockPricingTable = defineType({
  name: 'scheduleBlockPricingTable',
  type: 'object',
  title: 'Pricing Table',
  preview: {
    select: { title: 'blockTitle' },
    prepare: ({ title }: { title?: string }) => ({ title: title || 'Pricing' }),
  },
  fields: [
    defineField({ name: 'blockTitle', type: 'string', title: 'Block Title', initialValue: 'Pricing' }),
    defineField({
      name: 'rows',
      type: 'array',
      title: 'Table Rows',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'description', type: 'string', title: 'Description', validation: (r) => r.required() }),
            defineField({ name: 'price', type: 'string', title: 'Price', validation: (r) => r.required() }),
          ],
          preview: { select: { desc: 'description' }, prepare: ({ desc }: { desc?: string }) => ({ title: desc || 'Row' }) },
        },
      ],
    }),
  ],
});

// Simple Pricing Options: list of label + price
export const scheduleBlockSimplePricing = defineType({
  name: 'scheduleBlockSimplePricing',
  type: 'object',
  title: 'Simple Pricing Options',
  preview: {
    select: { title: 'blockTitle' },
    prepare: ({ title }: { title?: string }) => ({ title: title || 'Pricing Options' }),
  },
  fields: [
    defineField({ name: 'blockTitle', type: 'string', title: 'Block Title', initialValue: 'Pricing' }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label', validation: (r) => r.required() }),
            defineField({ name: 'price', type: 'string', title: 'Price', validation: (r) => r.required() }),
          ],
          preview: { select: { label: 'label' }, prepare: ({ label }: { label?: string }) => ({ title: label || 'Item' }) },
        },
      ],
    }),
  ],
});

// Time Slot Grid: rows of day + time slots
export const scheduleBlockTimeSlotGrid = defineType({
  name: 'scheduleBlockTimeSlotGrid',
  type: 'object',
  title: 'Time Slot Grid',
  preview: {
    select: { title: 'blockTitle' },
    prepare: ({ title }: { title?: string }) => ({ title: title || 'Time Slots' }),
  },
  fields: [
    defineField({ name: 'blockTitle', type: 'string', title: 'Block Title', initialValue: 'Schedule' }),
    defineField({
      name: 'slots',
      type: 'array',
      title: 'Time Slots',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'day', type: 'string', title: 'Day', description: 'e.g. Saturday, Mon–Fri' }),
            defineField({ name: 'time', type: 'string', title: 'Time', description: 'e.g. 9:00 AM – 12:00 PM' }),
            defineField({ name: 'optionalLabel', type: 'string', title: 'Optional Label', description: 'e.g. Beginner / Advanced' }),
          ],
          preview: { select: { day: 'day', time: 'time' }, prepare: ({ day, time }: { day?: string; time?: string }) => ({ title: `${day || ''} ${time || ''}`.trim() || 'Slot' }) },
        },
      ],
    }),
  ],
});
