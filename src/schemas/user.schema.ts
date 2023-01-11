import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({

        email: string({
            required_error: "Email is required!"
        }).email("Email is invalid!"),

        username: string({
            required_error: "Name is required!"
        }),

        password: string({
            required_error: "Password is required!"
        }).min(6, "Password should be between 6 to 25 chars!")
            .max(25, "Password should be between 6 to 25 chars!"),

        confirmPassword: string({
            required_error: "Password is required!"
        }).min(6, "Password should be between 6 to 25 chars!")
            .max(25, "Password should be between 6 to 25 chars!")

    }).refine((data) => data.password === data.confirmPassword, {
        message: "Password don't match !",
        path: ["confirmPassword"]
    })
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.confirmPassword">