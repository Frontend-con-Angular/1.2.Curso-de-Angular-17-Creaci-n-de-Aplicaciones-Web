import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category } from '@shared/models/category.model';
import { ProductParams } from '@shared/models/productParams.model';
import { CategoryService } from '@shared/services/category.service';
import { ProductService } from '@shared/services/product.service';
import { ProductsService } from '@shared/services/products.service';
import { CategoryComponent } from '../category/category.component';
import { map } from 'rxjs/operators';

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

  //variables de comunicacion con el servicio de la API
  productsApi = inject(ProductService);

  products = inject(ProductsService);
  listProducts = this.products.products;
  currentCategory = this.products.currentCategory;
  currentSearch = this.products.currentSearch;
  params = this.products.params;

  categoriesApi = inject(CategoryService);
  categories = signal<Category[]|null>(null);

  //conexion con la api URL para los query params
  private route = inject(ActivatedRoute);
  category_id$ = this.route.queryParams.pipe(map((params) => params['category_id']));

  constructor(){
    this.currentCategory.set(this.allCategories);
  }

  ngOnInit(){
    this.getCategories();
    this.category_id$.subscribe(id=>{
      this.currentCategory.set(this.findIndexCategory(id));
      this.getProducts();
    });
  };

  //functions
  private getCategories(){
    this.categoriesApi.getCategories()
    .subscribe({
      next: (categories)=>{
        this.categories.set(categories);
      },
      error: (e)=>{}
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
