import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const STORAGE_KEY = 'ventix.lang';
const SUPPORTED = ['es', 'en'];
const DEFAULT_LANG = 'es';

/**
 * Centralizes the active UI language: applies it through ngx-translate,
 * persists the choice and restores it on startup.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);

  readonly current = signal<string>(DEFAULT_LANG);

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = saved && SUPPORTED.includes(saved) ? saved : DEFAULT_LANG;
    this.translate.addLangs(SUPPORTED);
    this.translate.setFallbackLang(DEFAULT_LANG);
    this.use(initial);
  }

  use(lang: string): void {
    if (!SUPPORTED.includes(lang)) return;
    this.translate.use(lang);
    this.current.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }
}
