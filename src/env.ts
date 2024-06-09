import { z } from "zod";

const envSchema = z.object({
  MODE: z.enum(["development", "test"]),
});

export const env = envSchema.parse({
  MODE: "development" || "test",
});
