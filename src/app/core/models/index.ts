export type PhotoCategory =
  | 'bodas'
  | 'xv-anos'
  | 'retrato'
  | 'producto'
  | 'eventos-corporativos'
  | 'lifestyle'
  | 'musica'
  | 'conciertos';

export interface Photo {
  id: string;
  src: string;
  srcSet?: string;
  alt: string;
  category: PhotoCategory;
  featured?: boolean;
  width: number;
  height: number;
}

export interface CategoryFilter {
  id: PhotoCategory | 'all';
  label: string;
  icon?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  category: PhotoCategory;
  description: string;
  includes: string[];
  duration: string;
  deliverables: string;
  deliveryTime: string;
  price?: string; // opcional, muchos no lo muestran
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientPhoto?: string;
  eventType: PhotoCategory;
  text: string;
  rating: number; // 1-5
  date: string;
}

export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'whatsapp';
  url: string;
  handle?: string;
}

export interface PhotographerInfo {
  name: string;
  brandName: string;
  tagline: string;
  bio: string;
  shortBio: string;
  experience: number; // años
  profilePhoto: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  social: SocialLink[];
}
