import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";
import th from "zod/v4/locales/th.cjs";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerService({
  name,
  email,
  password,
}: RegisterRequest) {
  const password_hash = await hash(password, 6);

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new Error("Email already exists");
  }
  const prismaUsersRepository = new PrismaUsersRepository();
  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  });
}
