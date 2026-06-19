import {Component, inject} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {LanguageService} from '../../../application/language.service';

/**
 * Switches the active locale used by the translation service.
 */
@Component({
  selector: 'app-language-switcher',
  imports: [
    MatButtonToggleModule
  ],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  private language = inject(LanguageService);

  /**
   * The currently selected language code.
   */
  protected get currentLang(): string { return this.language.current(); }

  /**
   * List of available language codes.
   */
  protected languages: string[] = ['es', 'en'];

  /**
   * Changes the application's current language (persisted via LanguageService).
   *
   * @param language - The language code to switch to (e.g., 'en', 'es')
   */
  useLanguage(language: string) {
    this.language.use(language);
  }
}
