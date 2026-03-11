import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BeholdFeed, BeholdPost } from '@core/models/instagram.model';

@Injectable({ providedIn: 'root' })
export class InstagramService {
  private http = inject(HttpClient);

  private readonly FEED_URL = `https://feeds.behold.so/${environment.beholdFeedId}`;

  // ─── State ────────────────────────────────────────────────────────────────
  readonly posts = signal<BeholdPost[]>([]);
  readonly username = signal<string>('');
  readonly profilePicture = signal<string>('');
  readonly followersCount = signal<number>(0);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly loaded = signal(false);

  // Solo imágenes y carruseles, usando URL optimizada de Behold
  readonly imagePosts = computed(() =>
    this.posts()
      .filter(p => p.mediaType === 'IMAGE' || p.mediaType === 'CAROUSEL_ALBUM')
      .map(p => ({
        ...p,
        displayUrl: p.sizes?.medium?.mediaUrl ?? p.mediaUrl,
      }))
  );

  // ─── Fetch ────────────────────────────────────────────────────────────────
  loadFeed(): void {
    if (this.loaded()) return;

    this.loading.set(true);
    this.error.set(null);

    this.http.get<BeholdFeed>(this.FEED_URL).subscribe({
      next: (feed) => {
        this.posts.set(feed.posts ?? []);
        this.username.set(feed.username ?? '');
        this.profilePicture.set(feed.profilePictureUrl ?? '');
        this.followersCount.set(feed.followersCount ?? 0);
        this.loaded.set(true);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Behold feed error:', err);
        this.error.set('error');
        this.loading.set(false);
      },
    });
  }
}
