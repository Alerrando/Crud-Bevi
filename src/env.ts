import { z } from "zod";

const envSchema = z.object({
  MODE: z.enum(["test", "development"]),
});

export const env = envSchema.parse(import.meta.env);
