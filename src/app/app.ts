import { Component, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutComponent } from './shared/presentation/components/layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [ LayoutComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ventix');
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.use('en');
  }
}
