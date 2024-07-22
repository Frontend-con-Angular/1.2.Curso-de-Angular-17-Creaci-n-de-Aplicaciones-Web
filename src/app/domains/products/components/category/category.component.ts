import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Category } from '@shared/models/category.model';
import { ProductsService } from '@shared/services/products.service';
import { map } from 'rxjs/operators'; // Add this line

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  //variables propias
  @Input({ required: true }) category!: Category;

  //comunicacion con servicio Products
  private productsService = inject(ProductsService);
  currentCategory = this.productsService.currentCategory;

  changeCategory() {
    this.currentCategory.set(this.category);
    this.productsService.isHiddendropdown.update(statu=>!statu);
  }
}
