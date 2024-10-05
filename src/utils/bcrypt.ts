"use server";
import * as bc from "bcrypt-ts";

export const encryptPassword = async (password: string) =>
  await bc.hash(password, await bc.genSalt(10));

export const comparePasswords = async (password: string, hash: string) =>
  await bc.compare(password, hash);
