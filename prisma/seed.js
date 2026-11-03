// Seed : crée le compte administrateur et un article d'exemple NON publié.
//
// Variables d'environnement obligatoires :
//   ADMIN_EMAIL     email du compte admin (enregistré en minuscules)
//   ADMIN_PASSWORD  mot de passe du compte admin (12 caractères minimum)
// Option :
//   RESET_ADMIN_PASSWORD=1  remplace le mot de passe d'un compte admin qui existe déjà.
//                           Sans cette option, un compte existant n'est jamais modifié.
//
// Aucun mot de passe n'est écrit dans ce fichier.

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const MIN_PASSWORD_LENGTH = 12;
// bcrypt ignore tout ce qui dépasse 72 octets : on refuse plutôt que de tronquer en silence.
const MAX_PASSWORD_BYTES = 72;
const BCRYPT_COST = 12;

function fail(message) {
  console.error(`Seed arrêté : ${message}`);
  process.exit(1);
}

function readAdminConfig() {
  const rawEmail = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!rawEmail || !rawEmail.trim()) fail("ADMIN_EMAIL est absent.");
  if (!password) fail("ADMIN_PASSWORD est absent.");

  const email = rawEmail.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fail("ADMIN_EMAIL n'est pas une adresse email valide.");
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    fail(`ADMIN_PASSWORD doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères.`);
  }
  if (Buffer.byteLength(password, "utf8") > MAX_PASSWORD_BYTES) {
    fail(`ADMIN_PASSWORD ne doit pas dépasser ${MAX_PASSWORD_BYTES} octets (limite de bcrypt).`);
  }

  return { email, password, resetPassword: process.env.RESET_ADMIN_PASSWORD === "1" };
}

async function seedAdmin(prisma, { email, password, resetPassword }) {
  const existing = await prisma.admin.findUnique({ where: { email } });

  if (existing && !resetPassword) {
    console.log(`Admin ${email} : existe déjà, mot de passe inchangé (RESET_ADMIN_PASSWORD=1 pour le remplacer).`);
    return;
  }

  const hash = await bcrypt.hash(password, BCRYPT_COST);

  if (existing) {
    await prisma.admin.update({ where: { email }, data: { password: hash } });
    console.log(`Admin ${email} : mot de passe remplacé.`);
  } else {
    await prisma.admin.create({ data: { email, password: hash } });
    console.log(`Admin ${email} : créé.`);
  }
}

async function seedExampleNews(prisma) {
  // Article fictif : il est créé NON publié pour ne jamais apparaître sur le site public
  // tant qu'un humain ne l'a pas relu. Un article existant n'est jamais modifié.
  const slug = "exemple-article-bienvenue";
  const existing = await prisma.news.findUnique({ where: { slug } });
  if (existing) {
    console.log(`Article d'exemple "${slug}" : existe déjà, inchangé.`);
    return;
  }
  await prisma.news.create({
    data: {
      title: "[Exemple] Bienvenue à l'École Tinka-Tout",
      slug,
      content:
        "Article d'exemple créé par le seed. Remplacez ce texte par une vraie annonce de l'école avant de le publier.",
      category: "Annonces",
      published: false,
    },
  });
  console.log(`Article d'exemple "${slug}" : créé (non publié).`);
}

async function main() {
  const adminConfig = readAdminConfig();
  const prisma = new PrismaClient();
  try {
    await seedAdmin(prisma, adminConfig);
    await seedExampleNews(prisma);
    console.log("Seed OK");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
