import { Component } from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { FooterContentComponent } from '../footer-content/footer-content.component';

@Component({
  selector: 'app-layout',
  imports: [
    MatToolbar,
    MatToolbarRow,
    TranslatePipe,
    RouterLink,
    RouterLinkActive,
    MatButton,
    LanguageSwitcherComponent,
    RouterOutlet,
    FooterContentComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  options = [
    { link: '/home',       label: 'option.home' },
    { link: '/about',      label: 'option.about' },
    { link: '/devices',    label: 'option.devices' },
    { link: '/monitoring', label: 'option.monitoring' }
  ];
}
