import { z } from "zod";

export const routeSchema = z
  .object({
    source: z.string().min(1, "Please select an origin airport"),
    destination: z.string().min(1, "Please select a destination airport"),
    distance: z.string().min(1, "Distance is required"),
    fare: z.string().min(1, "Fare is required"),
  })
  .superRefine((data, ctx) => {
    if (data.source === data.destination) {
      ctx.addIssue({
        path: ["destination"],
        code: z.ZodIssueCode.custom,
        message: "Origin and destination must be different",
      });
    }
    if (isNaN(+data.distance) || +data.distance <= 0) {
      ctx.addIssue({
        path: ["distance"],
        code: z.ZodIssueCode.custom,
        message: "Distance must be a valid number greater than 0",
      });
    }
    if (isNaN(+data.fare) || +data.fare <= 0) {
      ctx.addIssue({
        path: ["fare"],
        code: z.ZodIssueCode.custom,
        message: "Fare must be a valid number greater than 0",
      });
    }
  });