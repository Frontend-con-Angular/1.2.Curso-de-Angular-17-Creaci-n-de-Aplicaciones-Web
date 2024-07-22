import { Component, inject, Input } from '@angular/core';
import { ProductCart } from '@shared/models/productCart.model';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-mini-product',
  standalone: true,
  imports: [],
  templateUrl: './mini-product.component.html',
  styleUrl: './mini-product.component.css'
})
export class MiniProductComponent {
  @Input({required: true}) productCart!: ProductCart;

  private productService = inject(ProductsService);
  reduceAmount(){
    this.productService.decreaseProduct(this.productCart.id);
  }
  increaseAmount(){
    this.productService.increaseProduct(this.productCart.id);
  }
  deleteItself(){
    this.productService.deleteProduct(this.productCart.id);
  }
}
