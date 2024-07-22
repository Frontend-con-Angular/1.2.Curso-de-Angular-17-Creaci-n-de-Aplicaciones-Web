import { Component, inject, signal } from '@angular/core';
import { CardCategoryComponent } from '../card-category/card-category.component';
import { Category } from '@shared/models/category.model';
import { CategoryService } from '@shared/services/category.service';
import { CategoriesService } from '@shared/services/categories.service';
@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [
    CardCategoryComponent
  ],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.css'
})
export class ListCategoriesComponent {
  //variables de comunicacion con el servicio Categories
  categoriesService = inject(CategoriesService);
  categories = this.categoriesService.categories;

  //Comunicacion con servicio Categories
  private categoryService = inject(CategoryService);

  constructor(){
  }

  ngOnInit(){
    this.getCategories();
  }

  private getCategories(){
    this.categoryService.getCategories()
    .subscribe({
      next: (categories)=>{
        this.categories.set(categories);
      },
      error: (e)=>{}
    });
  };
}
