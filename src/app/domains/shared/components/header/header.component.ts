import { Component, inject, signal } from '@angular/core';
import { CartComponent } from '@shared/components/cart/cart.component';
import { ProductsService } from '@shared/services/products.service';
import { SearchProductDirective } from '@shared/directives/search-product.directive';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { ConditionsDomService } from '@shared/services/conditions-dom.service';
import { ThemesService } from '@shared/services/themes.service';
import { Language } from '@shared/models/language.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CartComponent,
    ReactiveFormsModule,
    SearchProductDirective,
    RouterLinkWithHref,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  valueSearch = new FormControl();

  private productService = inject(ProductsService);
  total = this.productService.totalCart;
  ishiddenCart = this.productService.isHiddenCart;

  private conditionsDomService = inject(ConditionsDomService);
  isHiddenMainMenu = this.conditionsDomService.isHiddenMainMenu;
  isHiddenLanguagesMenu = this.conditionsDomService.isHiddenLanguagesMenu;

  private themeService = inject(ThemesService);
  isDarkMode = this.themeService.isDarkMode;

  languages = signal<Language[]>([]);
  currentLanguage = signal<Language|null>(null);

  constructor(private translateService: TranslateService){
    const langs: Language[]=[
      {code: 'es', label: 'Español', codeLanguage: 'es'},
      {code: 'us', label: 'English', codeLanguage: 'en'},
      {code: 'fr', label: 'Français', codeLanguage: 'fr'},
      {code: 'de', label: 'Deutsch', codeLanguage: 'de'},
      {code: 'it', label: 'Italiano', codeLanguage: 'it'},
      {code: 'pt', label: 'Português', codeLanguage: 'pt'}
    ];
    this.currentLanguage.set(langs[0]);
    this.languages.set(langs);
  }

  toggleMenu(){
    this.isHiddenMainMenu.update(state=>!state);
  }
  toggleLanguagesMenu(){
    this.isHiddenLanguagesMenu.update(state=>!state);
  }
  hideMenu(){
    this.isHiddenMainMenu.set(true);
  }
  toggleCart(){
    this.ishiddenCart.update(state=>!state);
  }
  updateCartStatus(status: boolean){
    this.ishiddenCart.set(status);
  }
  toggleDarkMode(){
    this.themeService.toggleDarkMode();
  }
  setLanguage(newLanguage: Language){
    this.currentLanguage.set(newLanguage);
    this.translateService.use(newLanguage.codeLanguage);
  }
}
