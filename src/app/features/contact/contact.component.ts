import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '@core/services/data.service';
import { RevealDirective } from '@shared/directives/reveal.directive';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  sessionType: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RevealDirective],
  template: `
    <div class="bg-[#faf9f7] min-h-screen pt-24">

      <div class="text-center py-16 px-6 border-b border-stone-200">
        <p appReveal="fade" class="text-stone-500 text-xs tracking-[0.3em] uppercase font-medium mb-4">Hablemos</p>
        <h1 appReveal="slide-up" [revealDelay]="100"
            class="text-stone-900 text-5xl md:text-6xl font-light"
            style="font-family:'Cormorant Garamond',serif">Contacto</h1>
      </div>

      <div class="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20">

        <!-- Info lateral -->
        <div>
          <h2 appReveal="slide-up"
              class="text-stone-900 text-3xl font-light mb-6"
              style="font-family:'Cormorant Garamond',serif">
            ¿Tienes un proyecto en mente?
          </h2>
          <p appReveal="slide-up" [revealDelay]="100"
             class="text-stone-700 text-base leading-relaxed mb-12">
            Me encantaría conocer tu historia. Escríbeme y platicamos sobre
            cómo hacer de tu sesión una experiencia única.
          </p>

          <div class="space-y-4">
            <a appReveal="slide-left" [revealDelay]="0"
               [href]="whatsappUrl" target="_blank"
               class="flex items-center gap-5 group border border-stone-200 bg-white p-5 hover:border-stone-400 hover:shadow-sm transition-all duration-300">
              <div class="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-500 group-hover:border-stone-400 flex-shrink-0">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <p class="text-stone-500 text-xs tracking-[0.2em] uppercase font-medium mb-1">WhatsApp</p>
                <p class="text-stone-900 text-sm font-semibold">{{ data.photographerInfo.phone }}</p>
              </div>
            </a>

            <a appReveal="slide-left" [revealDelay]="100"
               [href]="emailUrl"
               class="flex items-center gap-5 group border border-stone-200 bg-white p-5 hover:border-stone-400 hover:shadow-sm transition-all duration-300">
              <div class="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-500 group-hover:border-stone-400 flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-stone-500 text-xs tracking-[0.2em] uppercase font-medium mb-1">Email</p>
                <p class="text-stone-900 text-sm font-semibold">{{ data.photographerInfo.email }}</p>
              </div>
            </a>

            <div appReveal="slide-left" [revealDelay]="200"
                 class="flex items-center gap-5 border border-stone-200 bg-white p-5">
              <div class="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-500 flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-stone-500 text-xs tracking-[0.2em] uppercase font-medium mb-1">Ubicación</p>
                <p class="text-stone-900 text-sm font-semibold">{{ data.photographerInfo.location }}</p>
              </div>
            </div>
          </div>

          <div appReveal="fade" [revealDelay]="300" class="flex gap-6 mt-8">
            @for (s of data.photographerInfo.social; track s.platform) {
              <a [href]="s.url" target="_blank"
                 class="text-stone-400 hover:text-stone-900 text-xs tracking-[0.2em] uppercase transition-colors duration-300">
                {{ s.platform }}
              </a>
            }
          </div>
        </div>

        <!-- Formulario -->
        <div appReveal="slide-up" [revealDelay]="150"
             class="bg-white p-10 border border-stone-200 shadow-sm">

          <!-- Success state -->
          @if (status() === 'success') {
            <div class="h-full flex flex-col items-center justify-center text-center py-12">
              <div class="w-16 h-16 border border-stone-200 flex items-center justify-center mb-6">
                <svg class="w-7 h-7 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 class="text-stone-900 text-2xl font-light mb-3" style="font-family:'Cormorant Garamond',serif">
                ¡Mensaje enviado!
              </h3>
              <p class="text-stone-600 text-sm leading-relaxed mb-8 max-w-xs">
                Gracias por escribirme. Te contactaré en menos de 24 horas.
              </p>
              <button (click)="resetForm()"
                      class="text-stone-500 text-xs tracking-[0.2em] uppercase hover:text-stone-900 transition-colors border-b border-stone-300 pb-0.5">
                Enviar otro mensaje
              </button>
            </div>
          }

          <!-- Form -->
          @if (status() !== 'success') {
            <div class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="text-stone-600 text-xs tracking-[0.2em] uppercase block mb-2 font-semibold">
                    Nombre <span class="text-stone-400">*</span>
                  </label>
                  <input type="text" [(ngModel)]="form.name" name="name"
                         placeholder="Tu nombre"
                         class="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm px-4 py-3 focus:border-stone-500 focus:bg-white outline-none transition-all placeholder:text-stone-300" />
                </div>
                <div>
                  <label class="text-stone-600 text-xs tracking-[0.2em] uppercase block mb-2 font-semibold">Teléfono</label>
                  <input type="tel" [(ngModel)]="form.phone" name="phone"
                         placeholder="81 1234 5678"
                         class="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm px-4 py-3 focus:border-stone-500 focus:bg-white outline-none transition-all placeholder:text-stone-300" />
                </div>
              </div>

              <div>
                <label class="text-stone-600 text-xs tracking-[0.2em] uppercase block mb-2 font-semibold">
                  Email <span class="text-stone-400">*</span>
                </label>
                <input type="email" [(ngModel)]="form.email" name="email"
                       placeholder="tu@email.com"
                       class="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm px-4 py-3 focus:border-stone-500 focus:bg-white outline-none transition-all placeholder:text-stone-300" />
              </div>

              <div>
                <label class="text-stone-600 text-xs tracking-[0.2em] uppercase block mb-2 font-semibold">Tipo de sesión</label>
                <select [(ngModel)]="form.sessionType" name="sessionType"
                        class="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm px-4 py-3 focus:border-stone-500 focus:bg-white outline-none transition-all">
                  <option value="">Selecciona una opción</option>
                  @for (cat of data.categories; track cat.id) {
                    @if (cat.id !== 'all') {
                      <option [value]="cat.label">{{ cat.label }}</option>
                    }
                  }
                </select>
              </div>

              <div>
                <label class="text-stone-600 text-xs tracking-[0.2em] uppercase block mb-2 font-semibold">
                  Mensaje <span class="text-stone-400">*</span>
                </label>
                <textarea rows="5" [(ngModel)]="form.message" name="message"
                          placeholder="Cuéntame sobre tu evento o sesión..."
                          class="w-full bg-stone-50 border border-stone-200 text-stone-800 text-sm px-4 py-3 focus:border-stone-500 focus:bg-white outline-none transition-all placeholder:text-stone-300 resize-none"></textarea>
              </div>

              <!-- Error -->
              @if (status() === 'error') {
                <p class="text-red-500 text-xs tracking-wide text-center">
                  Hubo un error al enviar. Intenta de nuevo o escríbeme directo por WhatsApp.
                </p>
              }

              <button (click)="handleSubmit()"
                      [disabled]="status() === 'sending'"
                      class="w-full bg-stone-900 text-white text-xs tracking-[0.2em] uppercase py-4 hover:bg-stone-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                @if (status() === 'sending') {
                  Enviando...
                } @else {
                  Enviar mensaje
                }
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent implements OnInit {
  protected data = inject(DataService);
  protected status = signal<FormStatus>('idle');

  protected form: ContactForm = {
    name: '',
    email: '',
    phone: '',
    sessionType: '',
    message: '',
  };

  private readonly EMAILJS_SERVICE  = 'service_svw22ze';
  private readonly EMAILJS_TEMPLATE = 'template_aryli4p';
  private readonly EMAILJS_KEY      = '-bclJUaZhcy_6RJY_';

  ngOnInit(): void {
  }

  protected get whatsappUrl(): string { return `https://wa.me/${this.data.photographerInfo.whatsapp}`; }
  protected get emailUrl(): string { return `mailto:${this.data.photographerInfo.email}`; }

  protected async handleSubmit(): Promise<void> {
    if (!this.form.name || !this.form.email || !this.form.message) return;

    this.status.set('sending');

    try {
      const ejs = (window as any)['emailjs'];
      if (!ejs) throw new Error('EmailJS no cargado');

      await ejs.send(
        this.EMAILJS_SERVICE,
        this.EMAILJS_TEMPLATE,
        {
          name:         this.form.name,
          email:        this.form.email,
          phone:        this.form.phone || 'No proporcionado',
          session_type: this.form.sessionType || 'No especificado',
          title:        this.form.sessionType || 'Consulta general',
          message:      this.form.message,
        },
        this.EMAILJS_KEY
      );
      this.status.set('success');
    } catch (err) {
      console.error('EmailJS error:', err);
      this.status.set('error');
    }
  }

  protected resetForm(): void {
    this.form = { name: '', email: '', phone: '', sessionType: '', message: '' };
    this.status.set('idle');
  }
}
