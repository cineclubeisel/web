import { defineCollection } from 'astro/content/config'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import iso6391 from './iso-639-1'
import { AGE_RATINGS, GENRES, keys } from './util'
import { reference } from 'astro:content'

const events = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
    schema: ({ image }) => z.object({

        movie: z.object({

            title: z.string(),
            year: z.number().int().positive(),
            ageRating: z.enum(keys(AGE_RATINGS)),
            director: z.string(),
            genre: z.array(z.enum(GENRES)),

            poster: image(),
            backdrop: image(),

            language: z.object({
                audio: z.enum(keys(iso6391)),
                subtitles: z.enum(keys(iso6391)).optional()
            }),

            trailer: z.url().optional(),

            links: z.object({
                letterboxd: z.url(),
                tmdb: z.url(),
                imdb: z.url()
            })

        }),

        date: z.coerce.date(),
        duration: z.number().int().positive(),
        location: z.enum(['Auditório A', 'Auditório F']),

        after: z.object({
            attendance: z.number().int().nonnegative(),
            ratings: z.array(z.number().min(0).max(5).multipleOf(.5))
        }).optional()

    })
})

const posts = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
    schema: ({ image }) => z.object({

        title: z.string(),
        type: z.enum([ 'Crítica' ]),
        backdrop: image(),
        date: z.coerce.date(),
        author: reference('authors'),
        rating: z.number().min(0).max(5).multipleOf(.5),
        spoilers: z.boolean(),

        movie: z.object({

            title: z.string(),
            year: z.number().int().positive(),

            poster: image(),

            links: z.object({
                letterboxd: z.url(),
                tmdb: z.url(),
                imdb: z.url()
            })

        }),

    })
})

const authors = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/authors' }),
    schema: ({ image }) => z.object({

        name: z.string(),
        description: z.string().optional(),
        img: image().optional(),

        links: z.object({
            website: z.url().optional(),
            letterboxd: z.url().optional(),
            instagram: z.url().optional()
        }).optional()

    })
})

export const collections = { events, posts, authors }