export type Bilingual = { en: string; ar: string };

export type IconKey =
  | "car"
  | "shopping-bag"
  | "bar-chart"
  | "briefcase"
  | "layout-grid"
  | "smartphone";
export type FirestoreProject = {
  id: string;
  slug: string;
  number: string;
  title: Bilingual;
  description: Bilingual;
  category: Bilingual;
  technologies: string[];
  gradient: string;
  iconKey: IconKey;
  images: string[];
  liveUrl: string;
  statLabel: Bilingual;
  statValue: string;
  brief: Bilingual;
  approach: Bilingual;
  results: { label: Bilingual; value: string }[];
};

export type FirestoreTestimonial = {
  id: string;
  quote: Bilingual;
  author: string;
  role: Bilingual;
  featured: boolean;
  websiteUrl?: string;
  photoUrl?: string;
  rating?: number; // 1–5, defaults to 5 if not set
};