import { Component, inject, signal } from '@angular/core';
import { CardCategoryComponent } from '../card-category/card-category.component';
import { Category } from '@shared/models/category.model';
import { CategoryService } from '@shared/services/category.service';
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
  //variables propias
  categories = signal<Category[]>([]);

  //Comunicacion con servicio Categories
  private categoriesService = inject(CategoryService);

  constructor(){
  }

  ngOnInit(){
    this.getCategories();
  }

  private getCategories(){
    this.categoriesService.getCategories()
    .subscribe({
      next: (categories)=>{
        this.categories.set(categories);
      },
      error: (e)=>{}
    });
  };
}
