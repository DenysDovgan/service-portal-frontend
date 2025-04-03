import * as v from 'valibot'

export const loginSchema = v.object({
    email: v.pipe(v.string(), v.email('Invalid email')),
    password: v.pipe(v.string(), v.nonEmpty("Password can not be empty"))
})

export type LoginSchema = v.InferOutput<typeof loginSchema>
