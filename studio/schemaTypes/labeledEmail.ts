import { defineType, defineField } from "sanity";

export const labeledEmail = defineType({
  name: "labeledEmail",
  type: "object",
  title: "Email Entry",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "e.g. Part-Time Programs, Full-Time Programs",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email Address",
      validation: (r) => r.required().email(),
    }),
  ],
  preview: {
    select: { title: "title", email: "email" },
    prepare: ({ title, email }: { title?: string; email?: string }) => ({
      title: title || "Email",
      subtitle: email,
    }),
  },
});
