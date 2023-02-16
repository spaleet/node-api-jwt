import { object, string, TypeOf } from 'zod';

// sign up
export const signUpSchema = object({
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

export type SignUpInput = Omit<TypeOf<typeof signUpSchema>, "body.confirmPassword">


// sign in
export const signInSchema = object({
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

export type SignInInput = TypeOf<typeof signInSchema>

// update user
export const updateUserSchema = object({
    body: object({

        email: string({
            required_error: "Email is required!"
        }).email("Email is invalid!"),

        username: string({
            required_error: "Name is required!"
        }),

        oldPassword: string({
            required_error: "Old Password is required!"
        }).min(6, "Password should be between 6 to 25 chars!")
            .max(25, "Password should be between 6 to 25 chars!"),

        newPassword: string({
            required_error: "New Password is required!"
        }).min(6, "New Password should be between 6 to 25 chars!")
            .max(25, "Password should be between 6 to 25 chars!")

    }),

    params: object({
        uid: string({
            required_error: "user id is required",
        }),
    }),
})

export type UpdateUserInput = TypeOf<typeof updateUserSchema>