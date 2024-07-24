import { Injectable, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  isDarkMode = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  readUserPreference() {
    if (isPlatformBrowser(this.platformId)) {
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
      if (typeof document !== 'undefined'){
        document.body.classList.toggle('dark', prefersDarkScheme.matches);
        this.isDarkMode.set(prefersDarkScheme.matches);
      }
    }
  }

  toggleDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode.update(state => !state);
      document.body.classList.toggle('dark', this.isDarkMode());
    }
  }
}
