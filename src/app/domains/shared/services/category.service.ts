import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Category } from '@shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string = 'https://api.escuelajs.co/api/v1/';

  //comunicacion con peticiones
  private categoriesApi = inject(HttpClient);

  constructor() { }

  getCategories(){
    const newUrl= `${this.url}categories`;
    return this.categoriesApi.get<Category[]>(newUrl);
  };
}
