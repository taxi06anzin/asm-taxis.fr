// Tarifs taxi officiels — Arrêté préfectoral du Nord, applicables en 2026.
// Source : Préfecture du Nord, AP du 2026-02-02 (tarifs des courses de taxi 2026).
export const TARIFS = {
  priseEnCharge: 2.8, // €
  chute: 0.1, // € (incrément du compteur — le prix est un multiple de la chute)
  minimum: 8.0, // € (minimum de perception, suppléments inclus)
  attenteJour: 26.2, // €/h (marche au pas / attente, 7h-19h)
  attenteNuit: 34.1, // €/h (19h-7h)
  // Tarifs kilométriques (€/km)
  km: {
    A: 1.22, // jour, retour EN CHARGE (aller-retour avec client)
    B: 1.56, // nuit ou dimanche/férié, retour EN CHARGE
    C: 2.44, // jour, retour À VIDE (aller simple)
    D: 3.12, // nuit ou dimanche/férié, retour À VIDE
  },
  supplementBagage: 2.0, // € par bagage (4e+ ou encombrant)
  supplementPersonne: 4.0, // € par personne à partir de la 5e
  // Fenêtre "jour"
  jourDebut: 7, // 07h00
  jourFin: 19, // 19h00
} as const;

// Jours fériés français 2026 (tarif B/D appliqué même en journée).
export const JOURS_FERIES_2026 = [
  "2026-01-01", // Jour de l'an
  "2026-04-06", // Lundi de Pâques
  "2026-05-01", // Fête du Travail
  "2026-05-08", // Victoire 1945
  "2026-05-14", // Ascension
  "2026-05-25", // Lundi de Pentecôte
  "2026-07-14", // Fête nationale
  "2026-08-15", // Assomption
  "2026-11-01", // Toussaint
  "2026-11-11", // Armistice
  "2026-12-25", // Noël
];
