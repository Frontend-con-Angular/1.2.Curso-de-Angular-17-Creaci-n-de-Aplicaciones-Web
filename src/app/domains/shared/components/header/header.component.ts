import { Component, inject, signal } from '@angular/core';
import { CartComponent } from '@shared/components/cart/cart.component';
import { ProductsService } from '@shared/services/products.service';
import { SearchProductDirective } from '@shared/directives/search-product.directive';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { ConditionsDomService } from '@shared/services/conditions-dom.service';
import { ThemesService } from '@shared/services/themes.service';
import { Language } from '@shared/models/language.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CartComponent,
    ReactiveFormsModule,
    SearchProductDirective,
    RouterLinkWithHref,
    RouterLinkActive,
    TranslateModule
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
  }

  ngOnInit(){
    // Inicializa la lista de idiomas
    this.updateLanguageLabels();

    // Suscríbete a los cambios de idioma
    this.translateService.onLangChange.subscribe(() => {
      this.updateLanguageLabels();
    });
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
  private updateLanguageLabels() {
    this.translateService.get([
      'LanguageSpanish',
      'LanguageEnglish',
      'LanguageFrench',
      'LanguageGerman',
      'LanguageItalian',
      'LanguagePortuguese'
    ]).subscribe(translations => {
      this.languages.set([
        { code: 'es', label: translations['LanguageSpanish'], codeLanguage: 'es' },
        { code: 'us', label: translations['LanguageEnglish'], codeLanguage: 'en' },
        { code: 'fr', label: translations['LanguageFrench'], codeLanguage: 'fr' },
        { code: 'de', label: translations['LanguageGerman'], codeLanguage: 'de' },
        { code: 'it', label: translations['LanguageItalian'], codeLanguage: 'it' },
        { code: 'pt', label: translations['LanguagePortuguese'], codeLanguage: 'pt' }
      ]);
      // Inicializa el idioma por defecto
      this.setDefaultLanguage();
    });
  }
  private setDefaultLanguage(){
    if(this.currentLanguage()) return;

    const browserLanguageCode = this.translateService.getBrowserLang();
    const defaultLanguageCode = this.translateService.getDefaultLang();

    let auxLanguage;

    if(browserLanguageCode){
      auxLanguage = this.languages().find(language => language.codeLanguage == browserLanguageCode);
      this.translateService.use(browserLanguageCode);
    } else {
      auxLanguage = this.languages().find(language => language.codeLanguage == defaultLanguageCode);
    }

    if(auxLanguage) this.currentLanguage.set(auxLanguage);
  }
}
