import { Injectable, signal } from '@angular/core';
import { Category } from '@shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  // variables de Categorias
  categories = signal<Category[]>([]);
  
  constructor() { }
}
