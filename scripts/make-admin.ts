import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || process.argv[2];

  if (!email) {
    console.error("Error: No email address provided. Set ADMIN_EMAIL environment variable or pass it as a command-line argument.");
    process.exit(1);
  }
  const updatedUser = await prisma.user.update({
    where: { email },
    data: { isAdmin: true },
  });

  console.log(`User ${email} is now an admin`);
  console.log(`Updated user ID: ${updatedUser.id}, isAdmin: ${updatedUser.isAdmin}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
