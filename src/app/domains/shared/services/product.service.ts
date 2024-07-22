import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductParams } from '@shared/models/productParams.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = 'https://api.escuelajs.co/api/v1/';

  private http = inject(HttpClient);

  constructor() { }

  getProducts(params: ProductParams | null = {}){
    const urlProduct = new URL(`${this.url}products`);
    if(params?.title)
      urlProduct.searchParams.append('title', params?.title);
    if(params?.category_id)
      urlProduct.searchParams.append('categoryId', params?.category_id);
    console.log(urlProduct.href);
    return this.http.get<Product[]>(urlProduct.toString()).pipe(
      map(products =>{
        return products.map(product => {
          return {
            ...product,
            images: product.images.map(image =>
              this.cleanAndParseImageUrl(image)
            )
          }
        })
      }
      )
    );
  }


  getOneProduct(id: string){
    const urlProduct = `${this.url}products/${id}`;
    return this.http.get<Product>(urlProduct).pipe(
      map(product => ({
        ...product,
        images: product.images.map(image => this.cleanAndParseImageUrl(image))
      }))
    );
  }

  private cleanAndParseImageUrl(image: string): string {
    let cleanedImage = image.replace(/^\s*["\[\]]*|["\[\]]*\s*$/g, '');
    try {
      cleanedImage = JSON.parse(cleanedImage);
    } catch (error) {
      //
    }
    return cleanedImage;
  }
}
