import { Product } from "@shared/models/product.model";

export interface ProductCart extends Product {
  totalProduct: number
}
