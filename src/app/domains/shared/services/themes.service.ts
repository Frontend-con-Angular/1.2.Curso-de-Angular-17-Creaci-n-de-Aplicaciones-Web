import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  isDarkMode = signal(false);

  constructor() { }

  readUserPreference(){
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    document.body.classList.toggle('dark', prefersDarkScheme.matches);
    this.isDarkMode.set(prefersDarkScheme.matches);
  }

  toggleDarkMode(){
    this.isDarkMode.update(state=>!state);
    document.body.classList.toggle('dark', this.isDarkMode());
  }
}
