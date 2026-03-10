import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  groups: [{ name: 'nav', title: 'Navigation' }, { name: 'footer', title: 'Footer' }],
  fields: [
    defineField({
      name: 'navLinks',
      type: 'array',
      title: 'Navigation Links',
      group: 'nav',
      of: [{ type: 'navLink' }],
    }),
    defineField({
      name: 'footerTagline',
      type: 'text',
      title: 'Footer Tagline',
      group: 'footer',
      rows: 2,
    }),
    defineField({
      name: 'footerQuickLinks',
      type: 'array',
      title: 'Footer Quick Links',
      group: 'footer',
      of: [{ type: 'navLink' }],
    }),
    defineField({
      name: 'footerProgramLinks',
      type: 'array',
      title: 'Footer Program Links',
      group: 'footer',
      of: [{ type: 'navLink' }],
    }),
    defineField({ name: 'footerAddress', type: 'string', title: 'Footer Address', group: 'footer' }),
    defineField({ name: 'footerPhone', type: 'string', title: 'Footer Phone', group: 'footer' }),
    defineField({ name: 'footerEmail', type: 'string', title: 'Footer Email', group: 'footer' }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      title: 'Social Media Links',
      group: 'footer',
      description: 'Displayed under Contact in the footer.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              title: 'Platform',
              validation: (r) => r.required(),
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'TikTok', value: 'tiktok' },
                ],
              },
            }),
            defineField({ name: 'url', type: 'url', title: 'Profile URL', validation: (r) => r.required() }),
          ],
          preview: { select: { platform: 'platform' }, prepare: ({ platform }: { platform?: string }) => ({ title: platform || 'Social' }) },
        },
      ],
    }),
    defineField({ name: 'footerCopyright', type: 'string', title: 'Footer Copyright', description: "e.g. © {year} Milton Qur'an Institute. All rights reserved." }),
  ],
});
