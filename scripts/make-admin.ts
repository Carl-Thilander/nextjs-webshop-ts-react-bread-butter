import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "tomasis7@gmail.com";

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { isAdmin: true },
  });

  console.log(`User ${email} is now an admin`);
  console.log(updatedUser);
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
