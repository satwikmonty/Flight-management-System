import { z } from "zod";

export const GetUserProfileRequestSchema = z.object({
  id: z.number({
    required_error: "UserProfile ID is required",
    invalid_type_error: "UserProfile ID must be a number",
  }),
});

export const GetUserProfileResponseSchema = z.object({
  id: z.number(),
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dob: z.string(), 
  gender: z.string(),
  street: z.string(),
  location: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  mobileNo: z.string(),
  email: z.string().email(),
});

export const GetAllUserProfilesResponseSchema = z.array(GetUserProfileResponseSchema);
