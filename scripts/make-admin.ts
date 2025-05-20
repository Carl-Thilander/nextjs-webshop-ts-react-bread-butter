import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || process.argv[2];

  if (!email) {
    console.error(
      "Error: No email address provided. Set ADMIN_EMAIL environment variable or pass it as a command-line argument."
    );
    process.exit(1);
  }

  try {
    // Check if user exists first
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error(
        `Error: User with email ${email} not found in the database.`
      );
      console.log(
        "The user needs to sign in at least once before they can be made an admin."
      );
      process.exit(1);
    }

    // Update user to admin role
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { isAdmin: true },
    });

    console.log(`Success: User ${email} is now an admin`);
    console.log(updatedUser);
  } catch (error) {
    console.error("Failed to update user:", error);
    process.exit(1);
  }
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
