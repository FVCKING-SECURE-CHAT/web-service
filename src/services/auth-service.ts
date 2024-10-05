"use server";

import {
  ClearSessionId,
  GetSessionIdFromCookies,
  SetNewSessionToCookies,
} from "@/utils/cookie-funcs";
import prisma from "../../prisma/prisma";
import { comparePasswords, encryptPassword } from "@/utils/bcrypt";

export const GetCurrentSession = async () => {
  const sessionId = await GetSessionIdFromCookies();
  if (!sessionId) {
    await ClearSessionId();
    return null;
  }
  const session = await prisma.sessions.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: {
        select: {
          id: true,
          created_at: true,
          email: true,
          name: true,
          phone: true,
          updated_at: true,
        },
      },
    },
  });
  if (!session?.user) {
    await ClearSessionId();
    return null;
  }

  return session;
};

export const SignIn = async (username: string, password: string) => {
  const user = await prisma.users.findUnique({
    where: {
      username,
    },
  });

  if (!user) return "user not found.";

  if (!(await comparePasswords(password, user.password)))
    return "user not found.";

  const newSession = await prisma.sessions.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      payload: {},
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          username: true,
          created_at: true,
          updated_at: true,
        },
      },
    },
  });

  await SetNewSessionToCookies(newSession.id);

  return newSession;
};

export const SignUp = async (
  username: string,
  password: string,
  repassword: string,
  name?: string
) => {
  if (password != repassword) return "passwords does not match";
  username = username.toLowerCase();

  const user = await prisma.users.findUnique({
    where: {
      username,
    },
  });

  if (user) return "user allready exists";

  try {
    const newUser = await prisma.users.create({
      data: {
        password: await encryptPassword(password),
        username,
        name,
      },
    });
    return true;
  } catch (error) {
    return "unhandled error try again later please";
  }
};
