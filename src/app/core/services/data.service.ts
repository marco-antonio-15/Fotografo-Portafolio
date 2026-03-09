import { Injectable, signal, computed } from '@angular/core';
import {
  Photo,
  PhotoCategory,
  CategoryFilter,
  ServicePackage,
  Testimonial,
  PhotographerInfo,
} from '../models';

@Injectable({ providedIn: 'root' })
export class DataService {

  // ─── Photographer Info ───────────────────────────────────────────────────────
  readonly photographerInfo: PhotographerInfo = {
    name: 'Carlos Mendoza',
    brandName: 'Carlos Mendoza Photography',
    tagline: 'Capturando emociones que duran para siempre',
    shortBio: 'Fotógrafo profesional con más de 10 años de experiencia en bodas, retratos y eventos.',
    bio: `Mi nombre es Carlos Mendoza y llevo más de 10 años capturando los momentos más importantes
    en la vida de las personas. Creo que cada fotografía es una historia esperando ser contada,
    y mi misión es contarla con honestidad, belleza y emoción.
    Me especializo en bodas, XV años, retratos y eventos, pero lo que realmente me apasiona
    es conectar con mis clientes para entender qué hace único cada momento.`,
    experience: 10,
    profilePhoto: 'assets/images/photographer-profile.jpg',
    email: 'hola@carlosmendozaphoto.com',
    phone: '+52 81 1234 5678',
    whatsapp: '528112345678',
    location: 'Monterrey, Nuevo León, México',
    social: [
      { platform: 'instagram', url: 'https://instagram.com/carlosmendozaphoto', handle: '@carlosmendozaphoto' },
      { platform: 'facebook', url: 'https://facebook.com/carlosmendozaphoto' },
      { platform: 'tiktok', url: 'https://tiktok.com/@carlosmendozaphoto' },
    ],
  };

  // ─── Categories ──────────────────────────────────────────────────────────────
  readonly categories: CategoryFilter[] = [
    { id: 'all', label: 'Todos' },
    { id: 'bodas', label: 'Bodas' },
    { id: 'xv-anos', label: 'XV Años' },
    { id: 'retrato', label: 'Retrato' },
    { id: 'producto', label: 'Producto' },
    { id: 'eventos-corporativos', label: 'Corporativo' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'musica', label: 'Música' },
    { id: 'conciertos', label: 'Conciertos' },
  ];

  // ─── Portfolio Photos ─────────────────────────────────────────────────────────
  // Usando Unsplash para placeholders — reemplazar con fotos reales
  readonly photos: Photo[] = [
    { id: '1', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', alt: 'Boda elegante', category: 'bodas', featured: true, width: 800, height: 1200 },
    { id: '2', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', alt: 'Primer baile', category: 'bodas', featured: true, width: 800, height: 533 },
    { id: '3', src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800', alt: 'XV años', category: 'xv-anos', featured: true, width: 800, height: 1067 },
    { id: '4', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800', alt: 'Retrato femenino', category: 'retrato', featured: true, width: 800, height: 1000 },
    { id: '5', src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800', alt: 'Fotografía de producto', category: 'producto', width: 800, height: 800 },
    { id: '6', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', alt: 'Evento corporativo', category: 'eventos-corporativos', width: 800, height: 533 },
    { id: '7', src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800', alt: 'Concierto', category: 'conciertos', featured: true, width: 800, height: 533 },
    { id: '8', src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', alt: 'Músico en escena', category: 'musica', width: 800, height: 1200 },
    { id: '9', src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800', alt: 'Retrato masculino', category: 'retrato', width: 800, height: 1000 },
    { id: '10', src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800', alt: 'Boda en jardín', category: 'bodas', width: 800, height: 533 },
    { id: '11', src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800', alt: 'Lifestyle pareja', category: 'lifestyle', featured: true, width: 800, height: 1067 },
    { id: '12', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', alt: 'Concierto multitud', category: 'conciertos', width: 800, height: 533 },
  ];

  // ─── Services ─────────────────────────────────────────────────────────────────
  readonly services: ServicePackage[] = [
    {
      id: 'bodas-esencial',
      name: 'Boda Esencial',
      category: 'bodas',
      description: 'Cobertura completa de tu día más especial, desde los preparativos hasta la recepción.',
      includes: ['Preparativos novia y novio', 'Ceremonia completa', 'Sesión de pareja', 'Recepción (4 hrs)'],
      duration: '8 horas',
      deliverables: '400+ fotos editadas en alta resolución + galería digital privada',
      deliveryTime: '4-6 semanas',
    },
    {
      id: 'bodas-premium',
      name: 'Boda Premium',
      category: 'bodas',
      description: 'La experiencia completa con segundo fotógrafo y álbum impreso de lujo.',
      includes: ['Todo lo de Esencial', 'Segundo fotógrafo', 'Álbum impreso 30x30', 'Video highlights (3 min)', 'Pre-boda incluida'],
      duration: '12 horas',
      deliverables: '600+ fotos + álbum físico + video highlights',
      deliveryTime: '6-8 semanas',
    },
    {
      id: 'xv-anos',
      name: 'XV Años',
      category: 'xv-anos',
      description: 'Capturamos cada momento de tu quinceañera, desde los preparativos hasta el vals.',
      includes: ['Sesión de preparativos', 'Misa o ceremonia', 'Vals y fiesta (5 hrs)', 'Sesión exterior previa'],
      duration: '8 horas',
      deliverables: '350+ fotos editadas + galería digital',
      deliveryTime: '3-4 semanas',
    },
    {
      id: 'retrato',
      name: 'Sesión de Retrato',
      category: 'retrato',
      description: 'Sesión personal o familiar en locación a tu elección.',
      includes: ['Consulta previa', 'Locación a elegir', 'Cambio de outfits', 'Guía de posing'],
      duration: '2 horas',
      deliverables: '60+ fotos editadas + galería digital',
      deliveryTime: '1-2 semanas',
    },
    {
      id: 'producto',
      name: 'Fotografía de Producto',
      category: 'producto',
      description: 'Imágenes profesionales para e-commerce, catálogos y redes sociales.',
      includes: ['Fondo blanco / lifestyle', 'Retoque avanzado', 'Formatos para web y print', 'Uso comercial ilimitado'],
      duration: '3 horas',
      deliverables: '30+ fotos por producto, todos los formatos',
      deliveryTime: '3-5 días',
    },
    {
      id: 'corporativo',
      name: 'Evento Corporativo',
      category: 'eventos-corporativos',
      description: 'Cobertura profesional de congresos, lanzamientos, convenciones y más.',
      includes: ['Cobertura completa del evento', 'Retratos corporativos', 'Entrega exprés disponible', 'Fotos para prensa'],
      duration: 'Según evento',
      deliverables: 'Galería completa + selección de prensa',
      deliveryTime: '48-72 hrs (urgente disponible)',
    },
  ];

  // ─── Testimonials ─────────────────────────────────────────────────────────────
  readonly testimonials: Testimonial[] = [
    {
      id: '1',
      clientName: 'Andrea & Rodrigo',
      eventType: 'bodas',
      text: 'Carlos capturó cada emoción de nuestra boda de una manera que jamás imaginamos. Las fotos son simplemente mágicas. Nuestros familiares no podían creer la calidad.',
      rating: 5,
      date: '2024-10',
    },
    {
      id: '2',
      clientName: 'Sofía Ramírez',
      eventType: 'xv-anos',
      text: 'Mis XV años quedaron perfectos gracias a Carlos. Fue muy profesional y nos hizo sentir cómodas en todo momento. Las fotos son un tesoro.',
      rating: 5,
      date: '2024-09',
    },
    {
      id: '3',
      clientName: 'Grupo Empresarial Norteño',
      eventType: 'eventos-corporativos',
      text: 'Excelente trabajo en nuestra convención anual. Entrega puntual y calidad superior. Definitivamente lo contrataremos para el próximo año.',
      rating: 5,
      date: '2024-11',
    },
  ];

  // ─── Reactive State ───────────────────────────────────────────────────────────
  readonly activeCategory = signal<PhotoCategory | 'all'>('all');

  readonly filteredPhotos = computed(() => {
    const cat = this.activeCategory();
    return cat === 'all'
      ? this.photos
      : this.photos.filter((p) => p.category === cat);
  });

  readonly featuredPhotos = computed(() =>
    this.photos.filter((p) => p.featured)
  );

  setCategory(category: PhotoCategory | 'all'): void {
    this.activeCategory.set(category);
  }
}
