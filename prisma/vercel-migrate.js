// Applique les migrations Prisma pendant le build, UNIQUEMENT en production Vercel.
//
// - VERCEL_ENV=production : lance `prisma migrate deploy` (applique les migrations
//   en attente du dossier prisma/migrations, ne crée et ne supprime rien d'autre).
//   Si la migration échoue, le build échoue et l'ancienne version reste en ligne.
// - Production sans aucune base configurée : ne fait rien (site sans base).
// - Tout autre cas (preview, development, build local) : ne fait rien.
//
// `migrate deploy` passe par DIRECT_URL (pooler Supabase en mode session, port 5432),
// car le mode transaction (port 6543) ne garde pas le verrou utilisé par Prisma.

const { spawnSync } = require("child_process");
const path = require("path");

const vercelEnv = process.env.VERCEL_ENV;

if (vercelEnv !== "production") {
  console.log(`[vercel-migrate] VERCEL_ENV=${vercelEnv || "(absent)"} : migrations non appliquées.`);
  process.exit(0);
}

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
const hasDirectUrl = Boolean(process.env.DIRECT_URL);

// Aucune base configurée : le site public se construit quand même (actualités,
// formulaires et admin affichent « indisponible »). Les migrations seront
// appliquées au premier build qui aura les deux variables.
if (!hasDatabaseUrl && !hasDirectUrl) {
  console.warn(
    "[vercel-migrate] Aucune base configurée (DATABASE_URL et DIRECT_URL absentes) : migrations non appliquées. " +
      "Actualités, formulaires et admin resteront indisponibles jusqu'à leur ajout dans Vercel.",
  );
  process.exit(0);
}

// Une seule des deux : configuration incomplète, on bloque pour ne pas déployer à moitié.
if (!hasDatabaseUrl || !hasDirectUrl) {
  console.error("[vercel-migrate] DATABASE_URL et DIRECT_URL doivent être définies ensemble en production.");
  process.exit(1);
}

const prismaCli = path.join(path.dirname(require.resolve("prisma/package.json")), "build", "index.js");

console.log("[vercel-migrate] Production : prisma migrate deploy");
const result = spawnSync(process.execPath, [prismaCli, "migrate", "deploy"], { stdio: "inherit" });

if (result.error) {
  console.error("[vercel-migrate] Impossible de lancer Prisma :", result.error.message);
  process.exit(1);
}
process.exit(result.status === null ? 1 : result.status);
