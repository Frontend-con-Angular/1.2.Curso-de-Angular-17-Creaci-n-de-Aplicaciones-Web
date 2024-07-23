import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export default class ProductDetailComponent {
  //variables propias
  product = signal<Product | null>(null);
  mainImage = signal<string>('');

  //variables de obtencion de producto
  @Input() id?: string;
  private products = inject(ProductService);

  //Variables de comunicacion con el Cart
  private cart = inject(ProductsService);

  ngOnInit(){
    if(this.id){
      this.products.getOneProduct(this.id).
      subscribe({
        next: (product) => {
          this.product.set(product);
          this.mainImage.set(product.images[0]);
        },
        error: (e)=>{}
      })
    }
  }

  changeMainImage(url: string){
    this.mainImage.set(url);
  }
  addToChar(){
      const product = this.product();
      if(product) this.cart.addToCart(product);
  }
}
