import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductsService } from '@shared/services/products.service';
import { UpperCaseSpecialPipe } from '@shared/pipes/upper-case-special.pipe';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { RouterLink } from '@angular/router';
import { ClickStopPropagationDirective } from '@shared/directives/click-stop-propagation.directive';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    UpperCaseSpecialPipe,
    TimeAgoPipe,
    RouterLink,
    ClickStopPropagationDirective
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) product!: Product;

  private productService = inject(ProductsService);

  addProductCart() {
    this.productService.addToCart(this.product);
  }
}
