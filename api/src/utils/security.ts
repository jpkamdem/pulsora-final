import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

export function hashPassword(password: string): string {
  const salt = genSaltSync(15);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
}

const isPasswordValid = compareSync("test", hashPassword("test"));
console.log(isPasswordValid);
