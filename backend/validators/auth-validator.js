const z = require("zod");

const signupSchema = z.object({
    email: z 
        .string({ required: "Email is required! " })
        .trim()
        .email({ message: "Invalid email address" }), // Corrected to apply email validation to email field
    
    password: z 
        .string({ required: "Password is required! " })
        .trim()
        .min(1, { message: "Password must have at least 3 characters" }),

    name: z
        .string()
        .optional(),

    prof_pic: z
        .string()
        .optional(),
});

module.exports = signupSchema;
