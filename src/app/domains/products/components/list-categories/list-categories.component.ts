import { Component, signal } from '@angular/core';
import { CardCategoryComponent } from '../card-category/card-category.component';
import { Category } from '@shared/models/category.model';
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
  categories = signal<Category[]>([
    {
      "id": 1,
      "name": "Clothes",
      "image": "https://i.imgur.com/QkIa5tT.jpeg",
      "creationAt": "2024-07-22T04:19:34.000Z",
      "updatedAt": "2024-07-22T04:19:34.000Z"
    },
    {
      "id": 2,
      "name": "Electronics",
      "image": "https://i.imgur.com/ZANVnHE.jpeg",
      "creationAt": "2024-07-22T04:19:34.000Z",
      "updatedAt": "2024-07-22T04:19:34.000Z"
    },
    {
      "id": 3,
      "name": "Furniture",
      "image": "https://i.imgur.com/Qphac99.jpeg",
      "creationAt": "2024-07-22T04:19:34.000Z",
      "updatedAt": "2024-07-22T04:19:34.000Z"
    },
    {
      "id": 4,
      "name": "Shoes",
      "image": "https://i.imgur.com/qNOjJje.jpeg",
      "creationAt": "2024-07-22T04:19:34.000Z",
      "updatedAt": "2024-07-22T04:19:34.000Z"
    },
    {
      "id": 5,
      "name": "Miscellaneous",
      "image": "https://i.imgur.com/BG8J0Fj.jpg",
      "creationAt": "2024-07-22T04:19:34.000Z",
      "updatedAt": "2024-07-22T04:19:34.000Z"
    }
  ]);
}
