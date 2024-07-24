import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemesService } from '@shared/services/themes.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet/>'
})
export class AppComponent {
  private themeService = inject(ThemesService);
  ngOnInit(){
    this.themeService.readUserPreference();
  }
}
