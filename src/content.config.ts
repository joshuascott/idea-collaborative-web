import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    /** Used in <title> when the headline runs past 60 characters. */
    seoTitle: z.string().max(60).optional(),
    description: z.string().max(155),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    /** Which CTA closes the post. Alternates across the seed set. */
    cta: z.enum(['assessment', 'breakfast']).default('assessment'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
