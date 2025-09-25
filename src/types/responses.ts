import { Product, Brand, Category, ApiResponse, Subcategory } from '@/interfaces';
import { OrderResponse } from '@/interfaces/order';

export type ProductsResponse = ApiResponse<Product>;
export type BrandsResponse = ApiResponse<Brand>;
export type CategoriesResponse = ApiResponse<Category>;
export type SubCategoriesResponse = ApiResponse<Subcategory>;

// Single item responses
export type SingleBrandResponse = {
  data: Brand;
}

export type SingleCategoryResponse = {
  data: Category;
}

export type SingleSubcategoryResponse = {
  data: Subcategory;
}


export type SingleProductResponse = {
  data: Product;
}


export type AddToCartResponse = {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
      data: {
      _id: string,
      cartOwner: string,
      products: {
        count: number,
        _id: string,
        product: string,
        price: number
      }[],
      createdAt: string,
      updatedAt: string,
      totalCartPrice: number
    }
};

export type WishlistResponse = {
  status: string;
  count: number;
  data: Product[];
};

export type TokenResponse = {
  message: string,
  decoded: {
      id: string,
      name: string,
      role: string,
      iat: number,
      exp: number
  }
};

export type OrdersResponse = {
  data: OrderResponse[];
}
