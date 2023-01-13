import { object, string, TypeOf } from 'zod';

export const createSessionSchema = object({
    body: object({

        email: string({
            required_error: "Email is required!"
        }).email("Email is invalid!"),

        password: string({
            required_error: "Password is required!"
        }).min(6, "Password should be between 6 to 25 chars!")
            .max(25, "Password should be between 6 to 25 chars!"),

    })
})

export type CreateSessionInput = TypeOf<typeof createSessionSchema>