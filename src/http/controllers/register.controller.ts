import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";
import z from "zod";
import { hash } from "bcryptjs";
import { registerService } from "../services/register.service";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    await registerService({
      name,
      email,
      password,
    });
  } catch (error) {
    return reply.status(409).send({ message: "User already exists" });
  }

  return reply.status(201).send({ message: "User created successfully" });
}
