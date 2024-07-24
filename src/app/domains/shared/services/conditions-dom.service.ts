import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConditionsDomService {
  //variables conditionals
  isHiddenCart = signal(true);
  isHiddenCategoriesMenu = signal(true);
  isHiddenMainMenu= signal(true);
  isHiddenLanguagesMenu = signal(true);

  constructor() { }
}
