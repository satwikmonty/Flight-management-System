import { z } from "zod";

export const CreateUserProfileRequestSchema = z.object({
  userId: z
    .string({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a string"
    })
    .min(1),

  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string"
    })
    .min(1)
    .max(50),

  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string"
    })
    .min(1)
    .max(50),

  dob: z
    .string({
      required_error: "Date of birth is required",
      invalid_type_error: "Date of birth must be a string"
    })
    .refine(val => !isNaN(Date.parse(val)), {
      message: "Date of birth must be a valid date"
    }),

  gender: z
    .string({
      required_error: "Gender is required",
      invalid_type_error: "Gender must be a string"
    }),

  street: z
    .string({
      required_error: "Street is required",
      invalid_type_error: "Street must be a string"
    }),

  location: z
    .string({
      required_error: "Location is required",
      invalid_type_error: "Location must be a string"
    }),

  city: z
    .string({
      required_error: "City is required",
      invalid_type_error: "City must be a string"
    }),

  state: z
    .string({
      required_error: "State is required",
      invalid_type_error: "State must be a string"
    }),

  pincode: z
    .string({
      required_error: "Pincode is required",
      invalid_type_error: "Pincode must be a string"
    }),

  mobileNo: z
    .string({
      required_error: "Mobile number is required",
      invalid_type_error: "Mobile number must be a string"
    })
    .regex(/^\d{10,15}$/, "Mobile number must be 10 to 15 digits"),

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a valid string"
    })
    .email("Email must be a valid email address")
});

export const CreateUserProfileResponseSchema = z.object({
  id: z.number()
});
