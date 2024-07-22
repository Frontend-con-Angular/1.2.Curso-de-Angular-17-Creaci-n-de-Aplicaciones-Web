import { computed, Injectable, signal } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { Product } from '@shared/models/product.model';
import { ProductCart } from '@shared/models/productCart.model';
import { ProductParams } from '@shared/models/productParams.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Variables de Products
  products = signal<Product[]>([]);

  // variables de Cart
  cart = signal<ProductCart[]>([]);
  totalCart = computed(()=>{
    // return this.cart().reduce((acc, item)=>acc+item.totalProduct,0);
    return this.cart().length;
  });
  totalPriceCart = computed(()=>{
    return this.cart().reduce((acc, item)=>acc+item.totalProduct*item.price,0);
  });

  //variables de Filtro
  currentCategory = signal<Category|null>(null);
  currentSearch = signal<string>('');
  // params = signal<ProductParams|null>(null);
  params = computed<ProductParams | null>(()=>{
    let aux: ProductParams = {};

    const currentSearchValue = this.currentSearch();
    if (currentSearchValue) aux.title = currentSearchValue;

    const categoryId = this.currentCategory()?.id;
    if (categoryId)  aux.category_id = categoryId.toString();
    return aux;
  });

  //Variable para la comunicacion entre Header y Cart
  isHiddenCart = signal(true);
  isHiddendropdown = signal(true);

  constructor() {
  }

  addToCart(product: Product){
    const existeProduc = this.cart().some(item=>item.id==product.id);
    if(existeProduc){
      this.cart.update((state)=>{
        return state.map(item=>{
          if(item.id==product.id){
            return {...item, totalProduct: item.totalProduct+1};
          }
          return item;
        });
      });
    } else {
      this.cart.update((state)=>[...state, {...product,totalProduct:1}]);
    }
    console.log('producto agregado a carrito');
  };
  decreaseProduct(id: number){
    const existeProduc = this.cart().some(item=>item.id==id);
    if(!existeProduc) return;

    const totalItemsByProduct = this.cart().find(product=>product.id == id)?.totalProduct;
    if(totalItemsByProduct == 1) return this.deleteProduct(id);

    this.cart.update(products=>
      products.map(product=>{
        if(product.id==id) return {...product, totalProduct: product.totalProduct-1};
        else return product;
      })
    );
  };
  increaseProduct(id:number){
    const existeProduc = this.cart().some(item=>item.id==id);
    if(!existeProduc) return;

    this.cart.update(products=>
      products.map(product=>{
        if(product.id==id) return {...product, totalProduct: product.totalProduct+1};
        else return product;
      })
    );
  };
  deleteProduct(id:number){
    this.cart.update(products=>{
      return products.filter(product=>product.id != id);
    })
  };
}
