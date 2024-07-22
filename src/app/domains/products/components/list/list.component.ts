import { Component, computed, inject, Input, signal, SimpleChanges } from '@angular/core';
import { ProductComponent } from '@products/components/product/product.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { ProductsService } from '@shared/services/products.service';
import { ProductService } from '@shared/services/product.service';
import { FilterComponent } from '@products/components/filter/filter.component';
import { ProductParams } from '@shared/models/productParams.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ProductComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent {

  //variables de comunicacion con el servicio Productos
  private productService = inject(ProductsService);
  products = this.productService.products;
  totalProducts = computed(()=>{
    const products = this.products();
    return products.length
  });

  constructor() {
  }
  ngOnInit(){
  }
  ngOnChanges(){
    console.log('hello')
  }
}
