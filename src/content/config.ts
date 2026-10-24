import { defineCollection, z } from 'astro:content';

const interviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authorName: z.string().optional(),
    author: z.string().optional(),
    authorRole: z.string().optional(),
    authorPhoto: z.string().optional(),
    coverImage: z.string().optional(),
    interviewerName: z.string().optional(),
    issueNumber: z.string().optional(),
    date: z.coerce.date(),
    category: z.string().default('இலக்கியம்'),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().default(''),
    featured: z.boolean().default(false),
    photos: z.array(z.string()).default([]),
    qa: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    pullQuotes: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    heroTheme: z.enum(['yellow', 'blue', 'black']).default('yellow'),
  }),
});

export const collections = { interviews };
