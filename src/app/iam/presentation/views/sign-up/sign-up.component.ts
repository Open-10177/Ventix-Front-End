import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  private translate = inject(TranslateService);

  showLanguageModal = false;

  constructor() {
    this.translate.setDefaultLang('en');

    this.translate.use('en');
  }

  openLanguageModal(): void {
    this.showLanguageModal = true;
  }

  closeLanguageModal(): void {
    this.showLanguageModal = false;
  }

  changeLanguage(language: string): void {
    this.translate.use(language);

    this.closeLanguageModal();
  }
}
