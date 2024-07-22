import { Component, inject, signal} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category } from '@shared/models/category.model';
import { CategoryService } from '@shared/services/category.service';
import { ProductService } from '@shared/services/product.service';
import { ProductsService } from '@shared/services/products.service';
import { CategoryComponent } from '../category/category.component';
import { map } from 'rxjs/operators';
import { CategoriesService } from '@shared/services/categories.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CategoryComponent
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  //variables default
  allCategories: Category = {
    id: null,
    name: 'All Categories',
  };

  //variables propias de formulario
  inputSearch = new FormControl();

  //variables de comunicacion con el servicio de la API Product
  productsApi = inject(ProductService);

  //variables de comunicacion con el servicio Products
  products = inject(ProductsService);
  listProducts = this.products.products;
  currentCategory = this.products.currentCategory;
  currentSearch = this.products.currentSearch;
  params = this.products.params;

  //variables de comunicacion con el servicio de la API Category
  categoriesApi = inject(CategoryService);

  //variables de comunicacion con el servicio Categories
  categoriesService = inject(CategoriesService);
  categories = this.categoriesService.categories;

  //conexion con la api URL para los query params
  private route = inject(ActivatedRoute);
  category_id$ = this.route.queryParams.pipe(map((params) => params['category_id']));

  constructor(){
    this.currentCategory.set(this.allCategories);
  }

  ngOnInit(){
    this.updateProductByCategory();
  };

  private updateProductByCategory(){
    this.category_id$.subscribe(id=>{
      this.currentCategory.set(this.findIndexCategory(id));
      this.getProducts();
    });
  }
  private findIndexCategory(id: number): Category | null{
    const category = this.categories()?.find((category)=>category.id ==id);
    return category || this.allCategories;
  }
  private getProducts(){
    this.productsApi.getProducts(this.params()).subscribe({
      next: (products)=>this.listProducts.set(products),
      error: (e)=>console.log(e),
    });
  }
  searchProduct(){
    this.currentSearch.set(this.inputSearch.value);
    this.getProducts();
  }

  //aux functions
  collapseDropDown(){
    this.products.isHiddendropdown.update(statu=>!statu);
  }
}
