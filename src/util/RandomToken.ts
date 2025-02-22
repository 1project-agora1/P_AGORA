import { randomBytes } from "crypto";

export function generateRandomToken(size: number = 16): string {
  const randomValue = randomBytes(size).toString("hex").slice(0, 15);
  return randomValue;
}
