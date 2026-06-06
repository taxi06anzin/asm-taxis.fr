// Données centralisées ASM Taxis — source unique de vérité (NAP, identité, E-E-A-T)
export const site = {
  name: "ASM Taxis",
  legalName: "ASM TAXI", // raison sociale (SASU)
  legalForm: "SASU (société par actions simplifiée unipersonnelle)",
  capital: "500 €",
  rcs: "Lille Métropole 800 320 517",
  siren: "800 320 517",
  owner: "Mohamed Alaghyane",
  ads: "180", // Numéro ADS (autorisation de stationnement) Lille — TAXI 180 Lille
  adsAuthority: "Ville de Lille",
  url: "https://asm-taxis.fr",
  phone: "06 42 98 85 78",
  phoneIntl: "+33642988578",
  phoneHref: "tel:0642988578",
  whatsapp: "33642988578",
  email: "asm.taxis@gmail.com",
  googleProfile: "https://share.google/Eezf6WSRDWRkUrIOm",
  address: {
    street: "Entrée 5, Appartement 36, 2 square Pierre Billon",
    locality: "Loos",
    postalCode: "59120",
    region: "Hauts-de-France",
    country: "FR",
  },
  tva: "FR06800320517", // confirmé
  host: {
    name: "OVH SAS",
    address: "2 rue Kellermann, 59100 Roubaix, France",
    url: "https://www.ovhcloud.com/fr/",
  },
  mediator: {
    name: "CM2C — Centre de la Médiation de la Consommation de Conciliateurs de Justice",
    address: "14 rue Saint-Jean, 75017 Paris",
    url: "https://cm2c.net",
  },
  geo: { lat: 50.60921, lng: 3.01625 },
  zone: "Lille et métropole lilloise (MEL)",
  tagline: "Taxi Lille 24h/24 — artisan licencié ADS n°180",
} as const;

// Navigation principale (calée 1:1 sur les mots-clés cibles, zéro doublon d'intention)
export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/taxi-aeroport-lille/", label: "Aéroport" },
  { href: "/taxi-gare-lille-flandres/", label: "Gare Flandres" },
  { href: "/taxi-gare-lille-europe/", label: "Gare Europe" },
  { href: "/taxi-lille-nuit/", label: "Taxi de nuit" },
  { href: "/taxi-lille-pas-cher/", label: "Tarifs" },
  { href: "/reservation-taxi-lille/", label: "Réserver" },
  { href: "/contact/", label: "Contact" },
];

// LocalBusiness / TaxiService — schema de base réutilisé sur chaque page,
// enrichi de l'identité réelle (artisan + ADS) pour l'E-E-A-T.
export function localBusinessNode(extra: Record<string, unknown> = {}) {
  return {
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    additionalType: "https://schema.org/TaxiService",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    image: `${site.url}/assets/images/logo-asm-taxis.webp`,
    telephone: site.phoneIntl,
    email: site.email,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Espèces, Carte bancaire",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    // Zone de service (SAB) : Lille + métropole lilloise (communes réellement desservies)
    areaServed: [
      "Lille", "Loos", "Lambersart", "La Madeleine", "Marcq-en-Barœul", "Mons-en-Barœul",
      "Roubaix", "Tourcoing", "Villeneuve-d'Ascq", "Wasquehal", "Croix", "Hem",
      "Marquette-lez-Lille", "Saint-André-lez-Lille", "Wambrechies", "Bondues", "Mouvaux",
      "Haubourdin", "Ronchin", "Faches-Thumesnil", "Seclin", "Armentières", "Halluin",
      "Comines", "Linselles", "Neuville-en-Ferrain", "Baisieux", "Lys-lez-Lannoy",
      "Wattrelos", "Wervicq-Sud",
    ].map((name) => ({ "@type": "City", name })),
    provider: {
      "@type": "Organization",
      name: site.name,
      legalName: site.legalName,
    },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "ADS Lille (autorisation de stationnement)",
      value: site.ads,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [site.googleProfile],
    ...extra,
  };
}

export function faqNode(faq: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbNode(crumbs: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.path}`,
    })),
  };
}
