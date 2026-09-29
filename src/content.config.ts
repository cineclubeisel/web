import { defineCollection } from 'astro/content/config'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import iso6391 from './iso-639-1'
import { AGE_RATINGS, GENRES, keys } from './util'

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
        location: z.enum(['Auditório F']),

        after: z.object({
            attendance: z.number().int().nonnegative(),
            ratings: z.array(z.number().min(0).max(5).multipleOf(.5))
        }).optional()

    })
})

export const collections = { events }