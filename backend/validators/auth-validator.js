const z = require("zod");

const signupSchema = z.object({
    email: z 
        .string({ required: "Email is required! " })
        .trim()
        .email({ message: "Invalid email address" }), // Corrected to apply email validation to email field

    password: z 
        .string({ required: "Password is required! " })
        .trim()
        .min(3, { message: "Password must have at least 3 characters" }),

    name: z
        .string()
        .max(20, { message: "Not more than 20 characters" })
        .min(3, { message: "Name must have at least 3 characters" })
        .optional(),

    prof_pic: z
        .string()
        .max(20, { message: "Not more than 20 characters" })
        .min(3, { message: "Name must have at least 3 characters" })
        .optional(),
});

module.exports = signupSchema;
