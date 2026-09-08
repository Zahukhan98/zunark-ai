import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

async function upsertUser(name: string, email: string, password: string, role: "SUPER_ADMIN" | "ADMIN" | "DEVELOPER") {
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.upsert({
    where: { email },
    update: { name, role, passwordHash },
    create: { name, email, role, passwordHash },
  });
  console.log(`Seeded ${role}: ${user.email}`);
}

async function main() {
  await upsertUser(
    "Mohammed Zahid Khan",
    "zahid@zunark-ai.com",
    requireEnv("SEED_SUPER_ADMIN_PASSWORD"),
    "SUPER_ADMIN"
  );
  await upsertUser(
    "Mohammed Kamar",
    "kamar@zunark-ai.com",
    requireEnv("SEED_ADMIN_PASSWORD"),
    "ADMIN"
  );
  await upsertUser(
    "Developer",
    "dev@zunark-ai.com",
    requireEnv("SEED_DEVELOPER_PASSWORD"),
    "DEVELOPER"
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
