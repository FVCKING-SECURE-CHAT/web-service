"use server";

import { cookies } from "next/headers";

export const GetSessionIdFromCookies = async () => {
  return cookies().get("x-session-id")?.value ?? null;
};

export const SetNewSessionToCookies = async (sessionId: string) => {
  return cookies().set("x-session-id", sessionId, {
    // expires: 1 * 1000 * 60 * 60 * 24 * 7, // 7 gün
  });
};

export const ClearSessionId = async () => {
  return cookies().delete("x-session-id");
};
