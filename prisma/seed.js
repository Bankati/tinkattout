const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@tinka-tout.fr" },
    update: {},
    create: { email: "admin@tinka-tout.fr", password: hash },
  });
  await prisma.news.upsert({
    where: { slug: "bienvenue-rentree-2025" },
    update: {},
    create: {
      title: "Bienvenue pour la rentree 2025",
      slug: "bienvenue-rentree-2025",
      content: "L'equipe de l'Ecole Tinka-Tout vous souhaite la bienvenue. Les pre-inscriptions sont ouvertes.",
      category: "Annonces",
      published: true,
    },
  });
  console.log("Seed OK");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
