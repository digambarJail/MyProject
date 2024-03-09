// Validating the user entry using zod

const z = require("zod");

const signupSchema = z.object({
    email: z 
        .string({ required: "Email is required! " })
        .trim()
        .email({ message: "Invalid email address" }),
    
    password: z 
        .string({ required: "Password is required! " })
        .trim()
        .min(1, { message: "Password must have at least 1 characters" }),

    name: z
        .string()
        .optional(),

    prof_pic: z
        .string()
        .optional(),
});

module.exports = signupSchema;
