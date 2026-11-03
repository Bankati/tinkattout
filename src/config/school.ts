// Source unique des classes et statuts : formulaire public, validation serveur et filtres admin.
export const GRADE_LEVELS = [
  { value: "Petite Section", label: "Petite Section (PS)", cycle: "Maternelle" },
  { value: "Moyenne Section", label: "Moyenne Section (MS)", cycle: "Maternelle" },
  { value: "Grande Section", label: "Grande Section (GS)", cycle: "Maternelle" },
  { value: "CP", label: "CP", cycle: "Primaire" },
  { value: "CE1", label: "CE1", cycle: "Primaire" },
  { value: "CE2", label: "CE2", cycle: "Primaire" },
  { value: "CM1", label: "CM1", cycle: "Primaire" },
  { value: "CM2", label: "CM2", cycle: "Primaire" },
] as const;

export const GRADE_LEVEL_VALUES = GRADE_LEVELS.map((g) => g.value) as [
  (typeof GRADE_LEVELS)[number]["value"],
  ...(typeof GRADE_LEVELS)[number]["value"][],
];

export const REGISTRATION_STATUSES = {
  PENDING: "En attente",
  APPROVED: "Approuvé",
  REJECTED: "Refusé",
} as const;

export type RegistrationStatus = keyof typeof REGISTRATION_STATUSES;
