import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { MiniProductComponent } from '@shared/components/mini-product/mini-product.component';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MiniProductComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  private productService = inject(ProductsService);

  productsCart = this.productService.cart;
  total = this.productService.totalPriceCart;
  isHiddenCart = this.productService.isHiddenCart;

  toggleCart(){
    this.isHiddenCart.update(status=>!status);
  }
}
