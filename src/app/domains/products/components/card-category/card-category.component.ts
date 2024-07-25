import { Component, inject, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Category } from '@shared/models/category.model';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-card-category',
  standalone: true,
  imports: [
    RouterLinkWithHref,
    TranslateModule
  ],
  templateUrl: './card-category.component.html',
  styleUrl: './card-category.component.css'
})
export class CardCategoryComponent {
  //variables default
  listBackgroundColor: string[] = [
    'bg-orange-500',
    'bg-teal-500',
    'bg-purple-500',
    'bg-cyan-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-green-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-blue-500'
];

  //variables propias
  backGroundColor!:string;
  @Input({required:true}) category!: Category;

  //comunicacion con servicio Products
  private productsService = inject(ProductsService);
  currentCategory = this.productsService.currentCategory;

  constructor(){
    this.setRandomBackground();
  }

  changeCategory() {
    this.currentCategory.set(this.category);
  }

  setRandomBackground(){
    this.backGroundColor = this.listBackgroundColor[Math.floor(Math.random() * this.listBackgroundColor.length)];
  }
}
