import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

export function hashPassword(password: string): string {
  const salt = genSaltSync(15);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

const isPasswordValid = compareSync("test", hashPassword("test"));
console.log(isPasswordValid);
