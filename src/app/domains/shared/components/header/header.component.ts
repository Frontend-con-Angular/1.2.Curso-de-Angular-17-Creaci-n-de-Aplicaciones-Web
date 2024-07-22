import { Component, inject, signal } from '@angular/core';
import { CartComponent } from '@shared/components/cart/cart.component';
import { ProductsService } from '@shared/services/products.service';
import { SearchProductDirective } from '@shared/directives/search-product.directive';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CartComponent,
    ReactiveFormsModule,
    SearchProductDirective,
    RouterLinkWithHref,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  ishiddenMenu= signal(true);

  valueSearch = new FormControl();

  private productService = inject(ProductsService);
  total = this.productService.totalCart;
  ishiddenCart = this.productService.isHiddenCart;

  toggleMenu(){
    this.ishiddenMenu.update(state=>!state);
  }
  toggleCart(){
    this.ishiddenCart.update(state=>!state);
  }
  updateCartStatus(status: boolean){
    this.ishiddenCart.set(status);
  }
}
